import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { CreateUserAccountPage } from "../../pages/createUserAccount/createUserAccount";
import { SelectUserProfilePage } from "../selectUserProfile/selectUserProfile";

import { AuthService } from "../../providers/auth/auth";

//import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { Platform } from "ionic-angular/platform/platform";
import { StorageService } from "../../providers/common/storage";
import { SimpleToastService } from "../../providers/simple-toast/simple-toast";
import { TranslateService } from "@ngx-translate/core";
import { PlatformBridgeService } from "../../providers/platform-bridge/platform-bridge";
import {LoggerService} from "../../providers/logger/logger";

@Component({
  selector: "page-start",
  templateUrl: "start.html"
})
export class StartPage {
  private app: any;
  // load settings provider to make sure an instance is created on startup,
  // actually only necessary because settings page uses settings provider directly as datamodel
  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private authService: AuthService,
    //private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private toastService: SimpleToastService,
    private translate: TranslateService,
    private platformBridge: PlatformBridgeService
  ) {
    this.platform.ready().then(() => {
      /*this.speechRecognition.requestPermission().then(
        () => {
          console.log("Permission granted - everything OK!");
          /* To get the file permission needed for downloads, we have to check/create a file or folder
          this.requestFilePermission(this.storageProvider);
        }
      );*/
      this.requestFilePermission(this.storageService);
    });
  }

  private requestFilePermission(storage: StorageService) {
    storage
      .createAppDirOnExtRoot()
      .then(() => {
        this.signIn();
      })
      .catch(() => {
        this.translate.get("PERMISSION_FILE_NEEDED").subscribe((msg) => {
          this.toastService.displayToast(msg, null, true, () => {
            //this.requestFilePermission(storage);
          });
        });
      });
    if (this.platformBridge.platformIsBrowser()) {
      this.authService.addTestUser();
      this.authService
        .login({ name: "Test", email: "test@mail.com", pin: "1234" })
        .subscribe((allowed) => {
          if (allowed) {
            this.navCtrl.setRoot(SelectUserProfilePage);
          }
        });
      this.signIn();
    }
  }

  private signIn() {
    let self = this;
    this.authService.trySignIn(() => {
      console.log("Signed in");
      self.navCtrl.setRoot(SelectUserProfilePage);
    });
  }

  goToCreateAccount() {
    this.navCtrl.push(CreateUserAccountPage);
  }

  logout(){
    const root = this.app.getRootNav();
    root.pop.ToRoot();
  }
}
