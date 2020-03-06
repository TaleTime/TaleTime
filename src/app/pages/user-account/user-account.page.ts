import { Component, HostListener, OnInit } from "@angular/core";
import {NavController, Platform} from "@ionic/angular";

import {AuthService} from "../../services/auth/auth.service";
import {AlertController} from "@ionic/angular";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";

import {UserAccount} from "../../models/userAccount";
import {Router} from "@angular/router";
import {success} from "ionic/lib/color";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.page.html",
  styleUrls: ["./user-account.page.scss"],
})
export class UserAccountPage implements OnInit {
  private checked:boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastService: SimpleToastService,
    private alertCtrl: AlertController,
    private router: Router,
    private platform: Platform,
    //must be public for the aot compilation
    public authService: AuthService
  ) {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }

    document.addEventListener("DOMContentLoaded", this.loaded);
  }

  ngAfterViewChecked () {
    if (!this.checked) {
      this.checked = true;
      this.platform.ready().then(() => {
        // debugger;
        let elements = document.getElementsByClassName('mat-button mat-button-base mat-primary ng-star-inserted');
        console.log(elements);
        // let e = elements.item(0);
        // e.id = 'logAccountOut';
        // e.textContent
        debugger;
        for (let i = 0; i < elements.length; i++) {
          let e = elements.item(i);
          console.log(e);
          if (e.textContent === 'Sign out') {
            e.id = 'logAccountOut';
          }
        }
        console.log(document.getElementById('logAccountOut'));
      });
    }
  }

  @HostListener('load')
  loaded() {
    debugger;
  }

  public deleteAccount(){
    //TODO Ask user if button was clicked accidentally?
    this.authService.deleteAccount().subscribe((success) => {
      this.router.navigate(["/start"]);
    });
  }

  // public changePin() {
  //   debugger;
  //   this.router.navigate(["/change-user-account-pin"])
  //     .then(r => {
  //     });
  // }

  public async changePin() {
    const alert = await this.showPinChangeDialog((valid) => {
      if (valid) {
        this.toastService.displayToast("Pin changed!"); //TODO i18n
      } else {
        this.toastService.displayToast("Error, please try again."); //TODO i18n
      }
    });

    await alert.present();
  }

  public showPinChangeDialog(validFn: (arg) => void, cancelFn?: (arg) => void){
    return this.alertCtrl.create({
      header: "Change Pin", // TODO i18n
      inputs: [
        {
          name: "oldPin",
          placeholder: "Old Pin", // TODO i18n
          type: "password"
        },
        {
          name: "newPin",
          placeholder: "New Pin", // TODO i18n
          type: "password"
        },
        {
          name: "newPinRe",
          placeholder: "New Pin", // TODO i18n
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Cancel", // TODO i18n
          role: "cancel",
          handler: (data) => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              console.log("Cancel clicked"); //TODO i18n
            }
          }
        },
        {
          text: "Ok", // TODO i18
          handler: (data) => {
            this.authService.changePin(data.oldPin, data.newPin, data.newPinRe).subscribe(result => {
              validFn(result.success);
          });
          }
        }
      ]
    });
  }

  onUserEdited(event) {
    console.log(event);
  }

  onSignOut(event) {
    this.logout();
    // console.log(event);
  }

  onUserDelete() {
    console.log('TTTTTTTTTTTTTTTTTTTTT');
  }

  onBackKeyDown() {
    this.navCtrl.navigateForward("/settings", {});
  }

  public logout() {
    this.authService.logout().subscribe((success) => {
      this.router.navigate([""]);
    });
  }

  ngOnInit() {
    debugger;
  }

}
