/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-20
 */
import { Component } from "@angular/core";
import { App, NavController, Platform } from "ionic-angular";
import { StartPage } from "../../pages/start/start";
import { ChangeUserAccountPinPage } from "../../pages/change-user-account-pin/change-user-account-pin";

import { AuthService } from "../../providers/auth/auth";

import { UserAccount } from "../../datamodels/userAccount";

@Component({
  selector: "page-userAccount",
  templateUrl: "userAccount.html"
})
export class UserAccountPage {
  private userAccount: UserAccount;

  constructor(
    private app: App,
    private navCtrl: NavController,
    private platform: Platform,
    private authService: AuthService
  ) {
    this.platform.ready().then(() => {
      this.userAccount = this.authService.currentUserAccount;
    });
  }

  public changePin() {
    this.navCtrl.push(ChangeUserAccountPinPage);
  }

  public logout() {
    this.authService.logout().subscribe((success) => {
      // TODO is this pretty?
      this.navCtrl.setRoot(StartPage);
      this.navCtrl.popToRoot();
    });
  }
}
