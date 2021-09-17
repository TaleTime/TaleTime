import { Injectable } from "@angular/core";
import { throwError as observableThrowError } from "rxjs/internal/observable/throwError";
import { UserProfile } from "../../models/userProfile";
import { UserAccount } from "../../models/userAccount";
import { from, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { FireBaseService } from "../firebase/firebaseService";
import { map } from "rxjs/operators";
import { ConsoleLogger } from "@angular/compiler-cli/ngcc";
import { updateLanguageServiceSourceFile } from "typescript";
import { stringify } from "@angular/compiler/src/util";
import { Settings } from "src/app/models/settings";
import { StoryInformation } from "src/app/models/storyInformation";
import { Story } from "src/app/models/story/story";
import {
  FB_PATH_PROFILE,
  FB_PATH_SETTINGS,
  FB_PATH_USERS,
} from "src/app/constants/constants";

@Injectable({
  providedIn: "root",
})

/**
 * This class handels all concerns regarding Profiles. This service handles all.
 */
export class ProfileService {
  private activeUserProfile: UserProfile;
  private userProfiles: Map<string, UserProfile>;
  private promise: Promise<any> = null;
  private defaultSettings: Settings;
  private userAccount: UserAccount = this.authService.currentUserAccount;
  private pathToCurrentUser =
    FB_PATH_USERS + this.authService.currentUserAccount.uid + "/";

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FireBaseService
  ) {
    this.userProfiles = new Map<string, UserProfile>();
    this.setUserProfiles();
    this.defaultSettings = new Settings();
  }

  /**
   * Get the current user profile.
   * @return {UserProfile} Return a UserProfile object
   */
  public getActiveUserProfile() {
    if (this.activeUserProfile === undefined) {
      this.router.navigate(["/select-user-profile"]);
    }
    return this.activeUserProfile;
  }

  /**
   * Creates a user profile.
   * @param {credentials} value - name: any; avatarId: any; child: any;
   * @throws {observableThrowError} - Throw if credentials object is empty
   * @return {Observable} Return a observable
   */
  public createUserProfile(credentials: {
    name: any;
    avatarId: any;
    child: any;
  }) {
    if (credentials.name === null) {
      return observableThrowError("Please insert credentials");
    } else {
      const userProfile = new UserProfile(
        credentials.name,
        credentials.avatarId,
        credentials.child
      );

      this.firebaseService.setItem(
        this.pathToCurrentUser,
        userProfile.id + "/" + FB_PATH_PROFILE,
        userProfile
      );
      this.firebaseService.setItem(
        this.pathToCurrentUser,
        userProfile.id + "/" + FB_PATH_SETTINGS,
        this.defaultSettings
      );

      return new Observable(
        (subscriber: {
          next: (arg0: boolean) => void;
          complete: () => void;
        }) => {
          subscriber.next(true);
          subscriber.complete();
        }
      );
    }
  }

  /**
   * Delete a user profile.
   * @param {string} userProfileId - The id of a user profile
   * @return {Observable} Return a observable
   */
  public deleteUserProfile(userProfileId: string) {
    this.firebaseService.deleteItem(this.pathToCurrentUser + userProfileId);

    this.userProfiles.delete(userProfileId);

    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  /**
   * Set a user profile as active.
   * @param {string} userProfileId - The id of a user profile
   * @return {Observable} Return a observable
   */
  public setActiveUserProfile(userProfileId: string) {
    if (this.userProfiles.has(userProfileId)) {
      this.activeUserProfile = this.userProfiles.get(userProfileId);
    } else {
      console.log(userProfileId, " nicht vorhanden");
    }

    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  /**
   * Loads all UserProfiles and writes them into this.userProfiles
   *
   */
  public setUserProfiles(): void {
    this.firebaseService
      .getAllItems(this.pathToCurrentUser)
      .pipe(
        map((action) =>
          action.map((a) => {
            //Load Profile Information
            let profile = a.payload.child("/").val();
            let profileInfo = profile.profile;
            let userProfile = new UserProfile(
              profileInfo.name,
              profileInfo.avatar.id,
              profileInfo.child
            );
            //let userProfile = new UserProfile("BEDER", 1, false);

            //set userProfileId
            userProfile.id = a.payload.key;

            var arrayOfStories: Array<StoryInformation> = [];

            //JSON to Array<StoryInformation>
            for (let element in profile.ArrayOfStories) {
              arrayOfStories.push(profile.ArrayOfStories[element]);
              if (arrayOfStories[arrayOfStories.length - 1].readers == null)
                //set empty Array instead of null
                arrayOfStories[arrayOfStories.length - 1].readers = [];
            }

            userProfile.setArrayOfStories(arrayOfStories);

            return this.userProfiles.set(a.payload.key, userProfile);
          })
        )
      )
      .subscribe(() => {
        this.authService.currentUserAccount.userProfiles = this.userProfiles;
      });
  }

  /**
   * Get all user profiles of the current account.
   * @return {Observable<Object[]>} Return all users profiles as an array
   */
  public getUserProfilesObservable(): Observable<Object[]> {
    var userProfiles = this.firebaseService
      .getAllItems(this.pathToCurrentUser)
      .pipe(
        map((action) => action.map((a) => a.payload.child("/profile").val()))
      );

    return userProfiles;
  }

  /**
   * Stores a user profile. This is needed if a user profile is modified. e.g. story is added to the profile
   * @param {UserProfile} userProfile

   */
  public storeProfile(userprofile: UserProfile) {
    this.activeUserProfile = userprofile;
    const userAccount: UserAccount = this.authService.currentUserAccount;
    this.authService.save(userAccount);

    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }
}
