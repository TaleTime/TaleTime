import { Component } from "@angular/core";
import { IonicPage, NavController, AlertController, NavParams } from "ionic-angular";

import { AuthService } from "../../providers/auth/auth";
/**
 * Generated class for the ChangeUserAccountPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-change-user-account-pin",
  templateUrl: "change-user-account-pin.html"
})
export class ChangeUserAccountPinPage {
  createSuccess: boolean = false;
  credentials = { oldPin: "", pin: "", retypePin: "" };

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private authService: AuthService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangeUserAccountPinPage");
  }

  changePin() {
    this.authService
      .changePin(
        this.credentials.oldPin,
        this.credentials.pin,
        this.credentials.retypePin)
      .subscribe(
        (response) => {
          if (response.success) {
            this.navCtrl.pop();
          } else {
            // TODO popup with info
            this.showPopup("Error", "Problem changing pin.");
            console.log(response.reason);
          }
        },
        (error) => {
          console.log(
            "Change-user-account-pin-changePin(): " +
              error.prototype.toString() + ":" + JSON.stringify(error)
          );
        }
      );
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
