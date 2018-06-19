import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { CreateUserAccountPage } from "../../pages/createUserAccount/createUserAccount";
import { SelectUserProfilePage } from "../selectUserProfile/selectUserProfile"

import { AuthProvider } from '../../providers/auth/auth';

//import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { Platform } from "ionic-angular/platform/platform";
import { StorageProvider } from "../../providers/common/storage";
import { SimpleToastProvider } from "../../providers/simple-toast/simple-toast";
import { TranslateService } from "@ngx-translate/core";
import { PlatformBridgeProvider } from "../../providers/platform-bridge/platform-bridge";

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {
  // load settings provider to make sure an instance is created on startup,
  // actually only necessary because settings page uses settings provider directly as datamodel
  constructor(
    public navCtrl: NavController,
    private storageProvider: StorageProvider,
    private authProvider: AuthProvider,
    //private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private toastProvider: SimpleToastProvider,
    private translate: TranslateService,
    private platformBridge: PlatformBridgeProvider
  ) {

    this.platform.ready().then(() => {
      /*this.speechRecognition.requestPermission().then(
        () => {
          console.log("Permission granted - everything OK!");
          /* To get the file permission needed for downloads, we have to check/create a file or folder 
          this.requestFilePermission(this.storageProvider);
        }
      );*/
        this.requestFilePermission(this.storageProvider);

    });
  }
  

  private requestFilePermission(storage: StorageProvider) {
    storage.createAppDirOnExtRoot().then(() => {
      this.signIn();
    }).catch(() => {
      this.translate.get('PERMISSION_FILE_NEEDED').subscribe((msg) => {
        this.toastProvider.displayToast(msg, null, true, () => {
          //this.requestFilePermission(storage);
        });
      })
    });
    if (this.platformBridge.platformIsBrowser()) {
      this.authProvider.addTestUser();
      this.authProvider.login({ name: "Test", email: "test@mail.com", pin: "1234"}).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(SelectUserProfilePage);
      }
    });
      this.signIn();
    }
  }

  private signIn() {
    let self = this;

    this.authProvider.getUserAccount(function(userAccount) {
      if (userAccount) {
        self.authProvider.login(userAccount).subscribe(allowed => {
          if (allowed) {
            self.navCtrl.setRoot(SelectUserProfilePage);
          }
        });

      }
    });

  }

  goToCreateAccount() {
    this.navCtrl.push(CreateUserAccountPage);
  }
}
