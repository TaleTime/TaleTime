import { Observable, throwError as observableThrowError } from "rxjs";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { AlertController } from "@ionic/angular";
import { UserAccount } from "../../models/userAccount";
import { UserProfile } from "../../models/userProfile";
import { LoggerService } from "../logger/logger.service";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { Router } from "@angular/router";
import { FireBaseService } from "../firebase/firebaseService";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUser: UserAccount = null;
  private promise: Promise<any> = null;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private logger: LoggerService,
    private router: Router,
    private authProcessService: AuthProcessService,
    private firebaseService: FireBaseService
  ) {}

  async ready(): Promise<any> {
    if (this.promise === null) {
      this.promise = new Promise<void>((resolve, reject) => {
        if (this.currentUser === null) {
          this.authProcessService.user$.subscribe((user) => {
            if (user != null) {
              console.log(user);
              this.signIn(user, () => {
                this.router.navigate(["/select-user-profile"]);
                resolve();
              });
            } else {
              this.router.navigate(["/"]);
              resolve();
            }
          });
        } else {
          this.router.navigate(["/"]);
          resolve();
        }
      });
    }
    return this.promise;
  }

  /**
   * This function checks whether the given account already exists or not.
   * @param user
   * @param callback
   */
  async signIn(user, callback: () => any) {
    this.storage
      .ready()
      .then(() => this.storage.get(user.email))
      .then((userAccountData) => {
        //checks if a user in the local storage already exists
        if (userAccountData != null) {
          //user found
          this.currentUser = new UserAccount(
            user.displayName,
            user.email,
            user.uid,
            "",
            userAccountData.userProfiles
          );
        } else {
          //no user found
          this.currentUser = new UserAccount(
            user.displayName,
            user.email,
            user.uid,
            ""
          );
        }
        this.storage.set(user.email, this.currentUser);
        callback();
      });
  }

  public trySignIn(userAccount: UserAccount, callback: () => any) {
    this.storage
      .ready()
      .then(() => this.storage.get(userAccount.email))
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

  public register(credentials: { name: any; email: any; pin: any }) {
    if (
      credentials.email === null ||
      credentials.name === null ||
      credentials.pin === null
    ) {
      return observableThrowError("Please insert credentials");
    } else {
      const userAccount = new UserAccount(
        credentials.name,
        credentials.email,
        ""
      );
      userAccount.updatePin(credentials.pin); // Set pin seperately to hash it
      this.save(userAccount);

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

  public changePin(oldPin: any, newPin: any, retypePin: any) {
    const response = {
      success: true,
      reason: "",
    };

    if (this.currentUserAccount.checkPin(oldPin)) {
      if (newPin === retypePin) {
        this.currentUserAccount.updatePin(newPin);
        this.save(this.currentUserAccount);
      } else {
        response.success = false;
        response.reason = "New pin do not match"; // TODO i18n
      }
    } else {
      response.success = false;
      response.reason = "Old pin do not match"; // TODO i18n
    }

    return new Observable(
      (subscriber: {
        next: (arg0: { success: boolean; reason: string }) => void;
        complete: () => void;
      }) => {
        subscriber.next(response);
        subscriber.complete();
      }
    );
  }

  public logout() {
    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        this.currentUser = null;
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  public deleteAccount() {
    return new Observable(
      (subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        this.storage.remove(this.currentUser.email);
        this.currentUser = null;
        subscriber.next(true);
        subscriber.complete();
      }
    );
  }

  public save(userAccount: UserAccount) {
    this.storage.set(userAccount.email, userAccount);
  }

  get currentUserAccount(): UserAccount {
    return this.currentUser;
  }

  /*** UI ***/
  public presentPinPrompt(validFn: (arg) => void, cancelFn?: (arg) => void) {
    return this.alertCtrl.create({
      header: "PIN-Eingabe", // TODO i18
      inputs: [
        {
          name: "pin",
          placeholder: "Pin", // TODO i18
          type: "password",
        },
      ],
      buttons: [
        {
          text: "Cancel", // TODO i18
          role: "cancel",
          handler: (data) => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              this.logger.log("Cancel clicked");
            }
          },
        },
        {
          text: "Ok", // TODO i18
          handler: (data) => {
            if (validFn) {
              validFn(this.currentUserAccount.checkPin(data.pin));
            } else {
              this.logger.log("Ok clicked");
            }
          },
        },
      ],
    });
  }
}
