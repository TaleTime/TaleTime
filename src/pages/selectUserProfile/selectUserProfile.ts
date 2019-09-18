/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-28
 *
 *
 * TODO The event variable in delete end select is a workaround.
 */
import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NavController, ModalController } from "ionic-angular";

import { TabsPage } from "../tabs/tabs";
import { CreateUserProfilePage } from "../createUserProfile/createUserProfile";

import { AuthService } from "../../providers/auth/auth";
import { SimpleToastService} from "../../providers/simple-toast/simple-toast";

@Component({
  selector: "page-selectUserProfile",
  templateUrl: "selectUserProfile.html"
})
export class SelectUserProfilePage {
  isShowingOptions: boolean;
  isShowingOptionsButton: boolean = false;
  showingOptionsLabel: string;

  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    private toastService: SimpleToastService
  ) {
    this.isShowingOptions = false;
    this.translate.get("COMMON_EDIT").subscribe((value) => {
      // value is our translated string
      this.showingOptionsLabel = value;
    });

    const activeUserProfile = this.authService.getActiveUserProfile();
    if (activeUserProfile && !activeUserProfile.child) {
      this.isShowingOptionsButton = true;
    }
  }

  public select(event, userProfileId: string) {
    event.stopPropagation(); // TODO read desc in file header

    this.authService.setActiveUserProfile(userProfileId).subscribe(
      (success) => {
        if (success) {
          // this.navCtrl.push(TabsPage);
          this.navCtrl.setRoot(TabsPage);
        }
      },
      (error) => {
        console.log(
          "SelectUserProfilePage-select(): " +
            error.prototype.toString() +
            ":" +
            JSON.stringify(error)
        );
      }
    );
  }

  public delete(event, userProfileId: string) {
    console.log(event.stopPropagation()); // TODO read desc in file header

    console.log("delete: " + userProfileId);
   // console.log(this.authService.deleteUserProfile(userProfileId)
     // .subscribe(() => console.log('User wurde gelöscht'),
       // (error) => console.log(error));
  }

  public create() {
    let userProfileModal = this.modalCtrl.create(CreateUserProfilePage);
    userProfileModal.present();
  }

  public showOptions() {
    if (!this.isShowingOptions) {
      let alert = this.authService.presentPinPrompt((valid) => {
        if (valid) {
          this.isShowingOptions = true;
          this.showingOptionsLabel = this.translate.instant("COMMON_DONE");
        } else {
          this.toastService.displayToast("Wrong pin."); // TODO tobi i18
          return false;
        }
      });

      alert.present();
    } else {
      this.isShowingOptions = false;
      this.showingOptionsLabel = this.translate.instant("COMMON_EDIT");
    }
  }
}
