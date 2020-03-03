import {Component, OnInit} from "@angular/core";
import {AlertController, LoadingController, NavController,} from "@ionic/angular";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";
import {UserAccount} from "../../models/userAccount";

@Component({
  selector: "app-create-user-account",
  templateUrl: "./create-user-account.page.html",
  styleUrls: ["./create-user-account.page.scss"],
})
export class CreateUserAccountPage implements OnInit {

  createSuccess = false;
  registerCredentials = {name: "", email: "", pin: ""};

  constructor(public router: Router,
              private navCtrl: NavController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
  }

  public register() {
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
}
