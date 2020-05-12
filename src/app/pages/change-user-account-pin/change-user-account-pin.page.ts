import {Component, OnInit} from "@angular/core";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: "app-change-user-account-pin",
  templateUrl: "./change-user-account-pin.page.html",
  styleUrls: ["./change-user-account-pin.page.scss"],
})
export class ChangeUserAccountPinPage implements OnInit {

  credentials = {oldPin: "", pin: "", retypePin: ""};

  constructor(
    public nav: NavController,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    console.log("ngOnInit ChangeUserAccountPinPage");
  }

  changePin() {
    this.authService
      .changePin(
        this.credentials.oldPin,
        this.credentials.pin,
        this.credentials.retypePin
      )
      .subscribe(
        (response) => {
          if (response.success) {
            this.nav.pop();
          } else {
            // TODO popup with info
            console.log(response.reason);
          }
        },
        (error) => {
          console.log(
            "ChangeUserAccountPinPage-changePin(): " +
            error.prototype.toString() +
            ":" +
            JSON.stringify(error)
          );
        }
      );
  }
}
