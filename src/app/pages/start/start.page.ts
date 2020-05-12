import {Component, OnInit} from "@angular/core";
import {NavController, Platform} from "@ionic/angular";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";

import {StorageService} from "../../services/storage/storage.service";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";
import {TranslateService} from "@ngx-translate/core";
import {PlatformBridgeService} from "../../services/platform-bridge/platform-bridge.service";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { map } from "rxjs/operators";



@Component({
  selector: "app-start",
  templateUrl: "./start.page.html",
  styleUrls: ["./start.page.scss"],
})
export class StartPage implements OnInit {
  public email: string;
  public pin: string;

  // load settings Service to make sure an instance is created on startup,
  // actually only necessary because settings page uses settings Service directly as datamodel
  constructor(
    public navCtrl: NavController,
    public router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private t : AuthProcessService,
    // private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private toastService: SimpleToastService,
    private translate: TranslateService,
    private platformBridge: PlatformBridgeService
  ) {
    authService.ready();
    // if(this.authService.currentUserAccount == null){
    //   this.router.navigate(["/tabs/story-menu"]);
    // }
    // this.t.user$.subscribe(value => {
    //   if (value != null) {
    //     this.login(value);
    //   }
    // });


    this.platform.ready().then(() => {
      // this.speechRecognition.requestPermission().then(
      //   () => {
      //     console.log("Permission granted - everything OK!");
      //     /* To get the file permission needed for downloads, we have to check/create a file or folder
      //     this.requestFilePermission(this.storageService);
      //   }
      // );
      this.requestFilePermission(this.storageService);
    });
  }

  private requestFilePermission(storage: StorageService) {
    // storage
    //   .createAppDirOnExtRoot()
    //   .then(() => {
    //     //this.signIn();
    //   })
    //   .catch(() => {
    //     this.translate.get("PERMISSION_FILE_NEEDED").subscribe((msg) => {
    //       this.toastService.displayToast(msg, null, true, () => {
    //         // this.requestFilePermission(storage);
    //       });
    //     });
    //   });
    // if (this.platformBridge.platformIsBrowser()) {
    //   //this.authService.addTestUser();
    //   this.authService
    //     .login({name: "Test", email: "test@mail.com", pin: "1234"})
    //     .subscribe((allowed) => {
    //       if (allowed) {
    //         this.navCtrl.navigateRoot("/select-user-profile");
    //       }
    //     });
    //   this.signIn();
    // }
  }

  public login(user){
    //console.log(user);
    this.authService.signIn(user, () => {
      this.router.navigate(["/select-user-profile"]);
    });

    // this.authService
    //   .login({name: "Placeholder", email: this.email, pin: this.pin})
    //   .subscribe((allowed) => {
    //     if (allowed) {
    //       //this.navCtrl.navigateForward("/select-user-profile");
    //       this.router.navigate(["/select-user-profile"]);
    //     } else (this.toastService.displayToast("Wrong user or password!"))
    //   });
  }

  // private signIn() {
  //   const self = this;
  //   this.authService.trySignIn(() => {
  //     console.log("Signed in");
  //     self.navCtrl.navigateRoot("/select-user-profile");
  //   });
  // }

  goToCreateAccount() {
    this.navCtrl.navigateForward("/create-user-account");
  }

  ngOnInit() {
  }

}
