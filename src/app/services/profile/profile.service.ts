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

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FireBaseService
  ) {
    this.userProfiles = new Map<string, UserProfile>();
    this.setUserProfiles();
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
      const userAccount: UserAccount = this.authService.currentUserAccount;

      this.firebaseService.setItem(
        "users/" + userAccount.uid + "/",
        userProfile.id,
        userProfile
      );

      //userAccount.addUserProfile(userProfile);
      //this.authService.save(userAccount);

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
    const userAccount: UserAccount = this.authService.currentUserAccount;
    userAccount.removeUserProfile(userProfileId);
    this.authService.save(userAccount);

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
      .getAllItems("users/" + this.authService.currentUserAccount.uid)
      .pipe(
        map((action) =>
          action.map((a) => {
            let name = a.payload.child("/name").val();
            let child = a.payload.child("/child").val();
            let avatarId = a.payload.child("/avatar/id").val();
            let id = a.payload.key;
            let userProfile = new UserProfile(name, avatarId, child);
            userProfile.id = id;
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
   * @return {Array} Return all users profiles as an array
   */
  //Observable<Map<string, UserProfile>>
  public getUserProfilesObservable(): Observable<Object[]> {
    var userProfiles = this.firebaseService
      .getAllItems("users/" + this.authService.currentUserAccount.uid)
      .pipe(map((action) => action.map((a) => a.payload.toJSON())));

    return userProfiles;
    //  Array.from(
    //    this.authService.currentUserAccount.userProfiles.values()
    //  );
  }

  /**
   * Store a user profil. This is needed if a user profile is modified. e.g. story is added to the profile
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
