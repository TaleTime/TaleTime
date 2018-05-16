import { Component, OnDestroy } from "@angular/core";
import { NavController } from "ionic-angular";

import { CreateUserAccountPage } from "../../pages/createUserAccount/createUserAccount";
import { SelectUserProfilePage } from "../selectUserProfile/selectUserProfile"

import { AuthProvider } from '../../providers/auth/auth';

import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { Subscription } from "rxjs/Subscription";
import { Platform } from "ionic-angular/platform/platform";
import { StorageProvider } from "../../providers/common/storage";
import { SimpleToastProvider } from "../../providers/simple-toast/simple-toast";
import { TranslateService } from "@ngx-translate/core";
import { PlatformBridgeProvider } from "../../providers/platform-bridge/platform-bridge";
import { LoggerProvider } from "../../providers/logger/logger";
import { Storage } from "@ionic/storage/dist/storage";

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
    private ionStorage : Storage,
    private authProvider: AuthProvider,
    private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private toastProvider: SimpleToastProvider,
    private translate: TranslateService,
    private platformBridge: PlatformBridgeProvider,
    private logger : LoggerProvider
  ) {

    this.platform.ready().then(() => {
      this.speechRecognition.requestPermission().then(
        () => {
          console.log("Permission granted - everything OK!");
          /* To get the file permission needed for downloads, we have to check/create a file or folder */
          this.requestFilePermission(this.storageProvider);
        },
        () => {
          /* To get the file permission needed for downloads, we have to check/create a file or folder */
          this.requestFilePermission(this.storageProvider);
        }
      );
    });
  }

  private requestFilePermission(storage: StorageProvider) {
    if (this.platformBridge.platformIsBrowser()) {
      //Workaround for missing file plugin in browser
      this.signIn();
    } else {
      storage.createAppDirOnExtRoot().then(() => {
        this.signIn();
      }).catch(() => {
        this.translate.get('PERMISSION_FILE_NEEDED').subscribe((msg) => {
          this.toastProvider.displayToast(msg, null, true, () => {
            this.requestFilePermission(storage);
          });
        })
      });
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
