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

@Injectable({
  providedIn: "root",
})

/**
 * This class handels all concerns regarding Profiles. This service handles all.
 */
export class ProfileService {
  private activeUserProfile: UserProfile;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FireBaseService
  ) {}

  /**
   * Get the current user profile.
   * @return {UserProfile} Return a UserProfile object
   */
  public getActiveUserProfile() {
    console.log("GetActiveUserProfile");
    var userProfiles = this.firebaseService
      .getAllItems("users/" + this.authService.currentUserAccount.uid)
      .pipe(map((action) => action.map((a) => a.payload.toJSON())))
      .subscribe((userProfiles) => {
        console.log("userProfiles", userProfiles);
      });

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

      //map Userprofile or loop Userprofile
      this.firebaseService.setItem(
        "users/" + userAccount.uid + "/" + userProfile.id,
        "name",
        userProfile.name
      );
      this.firebaseService.setItem(
        "users/" + userAccount.uid + "/" + userProfile.id,
        "avatar",
        userProfile.avatar
      );
      this.firebaseService.setItem(
        "users/" + userAccount.uid + "/" + userProfile.id,
        "child",
        userProfile.child
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
    const userAccount: UserAccount = this.authService.currentUserAccount;
    if (userAccount.checkIfUserProfileIdExists(userProfileId)) {
      console.log("Pfad:", "users/" + userAccount.uid + "/" + userProfileId);
      var pipeData = this.firebaseService
        .getItemById("users/" + userAccount.uid + "/" + userProfileId)
        .pipe(map((a) => a.payload.toJSON()));
      console.log("PipeData:", pipeData);
      pipeData.subscribe((data) => {
        console.log("Data:", data);
      });
      const userProfile = userAccount.userProfiles.get(userProfileId);
      let newProfile = new UserProfile(
        userProfile.name,
        userProfile.avatar.id,
        userProfile.child
      );
      newProfile.arrayOfStories = userProfile.arrayOfStories;
      newProfile.arrayOfSaveGames = userProfile.arrayOfSaveGames;
      newProfile.id = userProfile.id;
      this.activeUserProfile = newProfile;
    } else {
      //@Tobi Eventuell Exception werfen
    }
    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  /**
   * Get all user profiles of the current account.
   * @return {Array} Return all users profiles as an array
   */
  public getUserProfiles() {
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
