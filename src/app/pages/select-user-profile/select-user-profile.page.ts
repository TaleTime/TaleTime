import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {ModalController, NavController} from "@ionic/angular";

import {CreateUserProfilePage} from "../create-user-profile/create-user-profile.page";

import {AuthService} from "../../services/auth/auth.service";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";

@Component({
  selector: "app-select-user-profile",
  templateUrl: "./select-user-profile.page.html",
  styleUrls: ["./select-user-profile.page.scss"],
})
export class SelectUserProfilePage implements OnInit {

  isShowingOptions: boolean;
  isShowingOptionsButton = false;
  showingOptionsLabel: string;

  constructor(
    private navCtrl: NavController,
    private translate: TranslateService,
    public authService: AuthService,
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
          this.navCtrl.navigateRoot("/tabs");
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
    event.stopPropagation(); // TODO read desc in file header

    console.log("delete: " + userProfileId);
    this.authService.deleteUserProfile(userProfileId);
  }

  public async create() {
    const userProfileModal = await this.modalCtrl.create({component: CreateUserProfilePage});
    await userProfileModal.present();
  }

  public async showOptions() {
    if (!this.isShowingOptions) {
      const alert = await this.authService.presentPinPrompt((valid) => {
        if (valid) {
          this.isShowingOptions = true;
          this.showingOptionsLabel = this.translate.instant("COMMON_DONE");
        } else {
          this.toastService.displayToast("Wrong pin."); // TODO tobi i18
          return false;
        }
      });

      await alert.present();
    } else {
      this.isShowingOptions = false;
      this.showingOptionsLabel = this.translate.instant("COMMON_EDIT");
    }
  }

  ngOnInit() {
  }

}
