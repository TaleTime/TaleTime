import {Component, OnInit} from "@angular/core";
import {AlertController, LoadingController, NavController,} from "@ionic/angular";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";
import {UserAccount} from "../../models/userAccount";
import { TranslateService } from "@ngx-translate/core";
import { AppComponent } from "../../app.component";
import { NgxAuthFirebaseuiLoginComponent, NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { SimpleToastService } from "../../services/simple-toast/simple-toast.service";

@Component({
  selector: "app-create-user-account",
  templateUrl: "./create-user-account.page.html",
  styleUrls: ["./create-user-account.page.scss"],
})
export class CreateUserAccountPage implements OnInit {

  createSuccess = false;
  registerCredentials = {name: "", email: "", pin: ""};
  private checked:boolean = false;

  constructor(public router: Router,
              private navCtrl: NavController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private translator: TranslateService,
              private app: AppComponent
  ) {

  }

  onLoad() {
    console.log(document.getElementById('createAccountButton').id = 'test');
    console.log(document.getElementById('test'));
  }

  ngAfterViewChecked () {
    if (!this.checked) {
      this.checked = true;

      let elements = document.getElementsByClassName('submit-button mat-raised-button mat-button-base mat-accent');
      for (let i = 0; i < elements.length; i++) {

        let e = elements.item(i);
        console.log(e.getAttribute('aria-label'));
        if (e.getAttribute('aria-label') === 'CREATE AN ACCOUNT') {
          e.id = 'registerAndCreateAccount';
        }
      }

      console.log(document.getElementById('registerAndCreateAccount'));
    }
  }

  ngOnInit() {

  }

  public error(event) {
    let message: string;
    switch (event.code) {
      case 'auth/invalid-email': {
        message = this.translator.instant('INVALID_EMAIL');
        break;
      } case 'auth/weak-password': {
        message = this.translator.instant('WEAK_PASSWORD');
        break;
      } case 'auth/email-already-in-use': {
        message = this.translator.instant('EMAIL_ALREADY_IN_USE');
        break;
      } default : {
        message = this.translator.instant('REGISTER_ERROR');
      }
    }
    console.log(event);
    this.app.openSnackBar(message, 'close');
  }

  public register(event) {
    console.log(event);
    this.showLoading();

    this.authService.register(this.registerCredentials).subscribe(
      (success) => {
        if (success) {
          this.createSuccess = true;
          // automatic login user
          try {
            let userAccount: UserAccount = new UserAccount(this.registerCredentials.name,
              this.registerCredentials.email, this.registerCredentials.pin);
            this.authService.trySignIn(userAccount,() =>
              this.router.navigate(["/select-user-profile"])
            );
          } catch (ex) {
            this.showPopup("Error", ex.message);
          }

        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      (error) => {
        this.showPopup("Error", error);
      }
    );
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
      backdropDismiss: true
    });
    await loading.present().catch(() => this.showError(loading, ""));
    await loading.dismiss();
  }

  async showError(loading, text) {
    await loading.dismiss();

    const alert = await this.alertCtrl.create({
      header: "Fail",
      subHeader: text,
      buttons: ["OK"]
    });
    await alert.present();
  }

  async showPopup(title, text) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: text,
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            if (this.createSuccess) {
              console.log("To be implemeted: Jump back to root");
              // this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public goToLoginPage() {
    this.navCtrl.navigateForward("");
  }
}
