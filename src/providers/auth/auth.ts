import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertController } from "ionic-angular";
import { UserAccount } from "../../datamodels/userAccount";
import { UserProfile } from "../../datamodels/userProfile";
import { LoggerProvider } from '../logger/logger';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  static USER_ACCOUNT_KEY: string = 'userAccount';
  private currentUser: UserAccount;
  constructor(private storage: Storage, private alertCtrl: AlertController,private logger: LoggerProvider) { }

  public trySignIn(callback: () => any) {
    this.storage.ready().then(
      () => this.storage.get(AuthProvider.USER_ACCOUNT_KEY)
    ).then(
      (userAccountData) => {
        if (userAccountData) {
          this.currentUser = new UserAccount(
            userAccountData.name,
            userAccountData.email,
            userAccountData.hash,
            userAccountData.userProfiles
          );
          callback();
        }
      }
    );
  }

  public addTestUser() {
    console.log("Test");
    let userAccount = new UserAccount("Test", "test@mail.com", "1234");
    this.storage.set(AuthProvider.USER_ACCOUNT_KEY, userAccount);
    this.storage.ready().then(() => this.storage.get(AuthProvider.USER_ACCOUNT_KEY).then((val) => {
      console.log(val);
    }));
  }

  public register(credentials) {
    if (credentials.email === null || credentials.name === null || credentials.pin === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let userAccount = new UserAccount(credentials.name, credentials.email);
      userAccount.updatePin(credentials.pin); // Set pin seperately to hash it
      this.save(userAccount);

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public createUserProfile(credentials) {
    if (credentials.name === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // TODO At this point store the credentials to your backend!
      let userProfile = new UserProfile(credentials.name, credentials.avatarId, credentials.child);
      this.currentUserAccount.addUserProfile(userProfile);
      this.save();

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public changePin(oldPin: any, newPin: any, retypePin: any) {
    let response = {
      success: true,
      reason: ''
    };

    if (this.currentUserAccount.checkPin(oldPin)) {
      if (newPin === retypePin) {
        this.currentUserAccount.updatePin(newPin);
        this.save();
      } else {
        response.success = false;
        response.reason = 'New pin do not match' // TODO Tobi i18n
      }
    } else {
      response.success = false;
      response.reason = 'Old pin do not match' // TODO Tobi i18n
    }

    return Observable.create(observer => {
      observer.next(response);
      observer.complete();
    });
  }

  public deleteUserProfile(userProfileId) {
    this.currentUserAccount.removeUserProfile(userProfileId);
    this.save();

    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public setActiveUserProfile(userProfileId) {
    this.currentUserAccount.setActiveUserProfile(userProfileId);
    this.save();

    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public getActiveUserProfile() {
    return this.currentUserAccount.activeUserProfile;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.remove(AuthProvider.USER_ACCOUNT_KEY);
      observer.next(true);
      observer.complete();
    });
  }

  private save(userAccount?: UserAccount) {
    this.storage.set(AuthProvider.USER_ACCOUNT_KEY, (userAccount || this.currentUserAccount));
  }

  get currentUserAccount(): UserAccount {
    return this.currentUser;
  }

  get userProfiles() {
    return Array.from(this.currentUserAccount.userProfiles.values());
  }

  /*** UI ***/
  public presentPinPrompt(validFn: Function, cancelFn?: Function) {
    return this.alertCtrl.create({
      title: 'PIN-Eingabe', // TODO tobi i18
      inputs: [
        {
          name: 'pin',
          placeholder: 'Pin', // TODO tobi i18
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel', // TODO tobi i18
          role: 'cancel',
          handler: data => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              this.logger.log('Cancel clicked');
            }
          }
        },
        {
          text: 'Ok', // TODO tobi i18
          handler: data => {
            if (validFn) {
              validFn(this.currentUserAccount.checkPin(data.pin));
            } else {
              this.logger.log('Ok clicked');
            }

          }
        }
      ]
    });
  }

}
