import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, NavController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../services/auth/auth.service";
import { SimpleToastService } from "../../services/simple-toast/simple-toast.service";




@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.page.html",
  styleUrls: ["./user-account.page.scss"],
})
export class UserAccountPage implements OnInit {
  private checked: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastService: SimpleToastService,
    private alertCtrl: AlertController,
    private router: Router,
    private translate: TranslateService,
    private platform: Platform,
    //must be public for the aot compilation
    public authService: AuthService,
  ) {

    // if(this.authService.currentUserAccount == null){
    //   this.router.navigate(["/start"]);
    // }
  }

  ngAfterViewInit() {
  }

  public deleteAccount() {
    //TODO Fancy ION Alert
    let decision = prompt(this.translate.instant("ASK_USER_DELETE_ACCOUNT"));
    if (decision === "j" || decision === "y") {
      this.authService.deleteAccount().subscribe((success) => {
        this.router.navigate(["/"]);
      });
    } else if (decision === "n") {
      alert(this.translate.instant("NO_USER_ACCOUNT_DELETION"))
    } else {
      alert(this.translate.instant("INVALID_INPUT"))
    }
  }

  onUserEdited(event) {
    console.log(event);
  }

  onSignOut() {
    this.logout();
  }

  /**
   * The framework has an extra parameter for a function that SHOULD be called after the user presses the delete Account
   * Button. BUT its not called... therefore we listen to every click on the page and check if the user pressed the delete Account
   * button.
   * @param event contains the event information
   */
  onUserDelete(event) {
    let elements = document.getElementsByClassName('mat-button mat-button-base mat-warn ng-star-inserted');
    let deleteAccountButton;

    for (let i = 0; i < elements.length; i++) {
      let element = elements.item(i);
      if (element.textContent === 'Delete account') {
        deleteAccountButton = element;
      }
    }

    if (event.target === deleteAccountButton) {
      this.deleteAccount();
    } else if (this.isDescendan(deleteAccountButton, event.target)) {
      this.deleteAccount();
    }
  }

  isDescendan(parent, child) {
    let node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
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
    // debugger;
  }
}
