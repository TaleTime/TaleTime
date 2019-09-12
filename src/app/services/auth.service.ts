import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";
import {AlertController} from "@ionic/angular";
import {UserAccount} from "../models/userAccount";
import {UserProfile} from "../models/userProfile";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  static USER_ACCOUNT_KEY = "userAccount";
  private currentUser: UserAccount;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private logger: LoggerService
  ) {
  }

  public trySignIn(callback: () => any) {
    this.storage
      .ready()
      .then(() => this.storage.get(AuthService.USER_ACCOUNT_KEY))
      .then((userAccountData) => {
        if (userAccountData) {
          this.currentUser = new UserAccount(
            userAccountData.name,
            userAccountData.email,
            userAccountData.hash,
            userAccountData.userProfiles
          );
          callback();
        }
      });
  }

  public addTestUser() {
    console.log("Test");
    const userAccount = new UserAccount("Test", "test@mail.com", "1234");
    this.storage.set(AuthService.USER_ACCOUNT_KEY, userAccount);
    this.storage.ready().then(() =>
      this.storage.get(AuthService.USER_ACCOUNT_KEY).then((val) => {
        console.log(val);
      })
    );
  }

  public register(credentials: { name: any; email: any; pin: any }) {
    if (
      credentials.email === null ||
      credentials.name === null ||
      credentials.pin === null
    ) {
      return Observable.throw("Please insert credentials");
    } else {
      const userAccount = new UserAccount(credentials.name, credentials.email);
      userAccount.updatePin(credentials.pin); // Set pin seperately to hash it
      this.save(userAccount);

      return Observable.create(
        (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
          observer.next(true);
          observer.complete();
        }
      );
    }
  }

  public createUserProfile(credentials: {
    name: any;
    avatarId: any;
    child: any;
  }) {
    console.log("if been here");
    if (credentials.name === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // TODO At this point store the credentials to your backend!
      const userProfile = new UserProfile(
        credentials.name,
        credentials.avatarId,
        credentials.child
      );
      this.currentUserAccount.addUserProfile(userProfile);
      this.save();

      return Observable.create(
        (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
          observer.next(true);
          observer.complete();
        }
      );
    }
  }

  public changePin(oldPin: any, newPin: any, retypePin: any) {
    const response = {
      success: true,
      reason: ""
    };

    if (this.currentUserAccount.checkPin(oldPin)) {
      if (newPin === retypePin) {
        this.currentUserAccount.updatePin(newPin);
        this.save();
      } else {
        response.success = false;
        response.reason = "New pin do not match"; // TODO Tobi i18n
      }
    } else {
      response.success = false;
      response.reason = "Old pin do not match"; // TODO Tobi i18n
    }

    return Observable.create(
      (observer: {
        next: (arg0: { success: boolean; reason: string }) => void;
        complete: () => void;
      }) => {
        observer.next(response);
        observer.complete();
      }
    );
  }

  public deleteUserProfile(userProfileId: string) {
    this.currentUserAccount.removeUserProfile(userProfileId);
    this.save();

    return Observable.create(
      (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
        observer.next(true);
        observer.complete();
      }
    );
  }

  public setActiveUserProfile(userProfileId: string) {
    this.currentUserAccount.setActiveUserProfile(userProfileId);
    this.save();

    return Observable.create(
      (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
        observer.next(true);
        observer.complete();
      }
    );
  }

  public getActiveUserProfile() {
    return this.currentUserAccount.activeUserProfile;
  }

  /** This method has been removed in the latest merge from March;
   * it is used in start.ts though. Removal was maybe done because of hashing PIN.
   * TODO: Find out how to modify start.ts in order to remove this function here again.
   * @param credentials
   */
  public login(credentials) {
    console.log(credentials);
    if (credentials.email === null || credentials.pin === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create((observer) => {
        // TODO At this point make a request to your backend to make a real check!
        let access = false;
        this.storage.ready().then(() =>
          this.storage.get(AuthService.USER_ACCOUNT_KEY).then((val) => {
            console.log(val);
            if (val) {
              const storageUser = new UserAccount(
                val.name,
                val.email,
                val.pin,
                val.userProfiles
              );
              access = storageUser.checkCredentials(
                credentials.email,
                credentials.pin
              ); // TODO workaround because pin is store as pin (later in hash). Must be check via UserAccount and checkPin()
              if (access) {
                this.currentUser = storageUser;
              }
            }

            observer.next(access);
            observer.complete();
          })
        );
      });
    }
  }

  public logout() {
    return Observable.create(
      (observer: { next: (arg0: boolean) => void; complete: () => void }) => {
        this.currentUser = null;
        this.storage.remove(AuthService.USER_ACCOUNT_KEY);
        observer.next(true);
        observer.complete();
      }
    );
  }

  private save(userAccount?: UserAccount) {
    this.storage.set(
      AuthService.USER_ACCOUNT_KEY,
      userAccount || this.currentUserAccount
    );
  }

  get currentUserAccount(): UserAccount {
    return this.currentUser;
  }

  get userProfiles() {
    return Array.from(this.currentUserAccount.userProfiles.values());
  }

  /*** UI ***/
  public presentPinPrompt(validFn: (arg) => void, cancelFn?: (arg) => void) {
    return this.alertCtrl.create({
      header: "PIN-Eingabe", // TODO tobi i18
      inputs: [
        {
          name: "pin",
          placeholder: "Pin", // TODO tobi i18
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Cancel", // TODO tobi i18
          role: "cancel",
          handler: (data) => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              this.logger.log("Cancel clicked");
            }
          }
        },
        {
          text: "Ok", // TODO tobi i18
          handler: (data) => {
            if (validFn) {
              validFn(this.currentUserAccount.checkPin(data.pin));
            } else {
              this.logger.log("Ok clicked");
            }
          }
        }
      ]
    });
  }
}
