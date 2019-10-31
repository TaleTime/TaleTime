import {Component, OnInit} from "@angular/core";
import {NavController, Platform} from "@ionic/angular";

import {AuthService} from "../../services/auth/auth.service";

import {UserAccount} from "../../models/userAccount";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.page.html",
  styleUrls: ["./user-account.page.scss"],
})
export class UserAccountPage implements OnInit {

  public userAccount: UserAccount = new UserAccount("Test", "test@mail.com", "1234"); // TODO was not necessary before

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private authService: AuthService
  ) {
    this.platform.ready().then(() => {
      this.userAccount = this.authService.currentUserAccount;
    });
  }

  public changePin() {
    this.navCtrl.navigateForward("/change-user-account-pin")
      .then(r => {
      });
  }

  public logout() {
    this.authService.logout().subscribe((success) => {
      // TODO is this pretty?
      this.navCtrl.navigateRoot("/start");
    });
  }

  ngOnInit() {
  }

}
