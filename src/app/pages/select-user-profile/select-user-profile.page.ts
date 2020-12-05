import {Component, OnInit} from "@angular/core";
import{Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {ModalController, NavController} from "@ionic/angular";

import {CreateUserProfilePage} from "../create-user-profile/create-user-profile.page";

import {AuthService} from "../../services/auth/auth.service";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";
import {SettingsService} from "../../services/settings/settings.service";
import {ProfileService} from "../../services/profile/profile.service";

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
    private settingsService: SettingsService,
    private router: Router,
    private translate: TranslateService,
    public authService: AuthService,
    public modalCtrl: ModalController,
    private toastService: SimpleToastService,
    public  profilService: ProfileService
  ) {
    this.isShowingOptions = true;
    this.translate.get("COMMON_EDIT").subscribe((value) => {
      // value is our translated string
      this.showingOptionsLabel = value;
    });
    const activeUserProfile = this.profilService.getActiveUserProfile();
    if (activeUserProfile && !activeUserProfile.child) {
      this.isShowingOptionsButton = true;
    }
  }

  public select(event, userProfileId: string) {
    event.stopPropagation();
    this.profilService.setActiveUserProfile(userProfileId).subscribe(
      (success) => {
        if (success) {
          // this.navCtrl.push(TabsPage);
          this.settingsService.loadSettings();
          this.router.navigate(["/tabs/story-menu"]);
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
    event.stopPropagation();

    console.log("delete: " + userProfileId);
    this.profilService.deleteUserProfile(userProfileId);
  }

  public create(){
    this.router.navigate(["create-user-profile"]);
  }

  public async showOptions() {
    if (!this.isShowingOptions) {
      const alert = await this.authService.presentPinPrompt((valid) => {
        if (valid) {
          this.isShowingOptions = true;
          this.showingOptionsLabel = this.translate.instant("COMMON_DONE");
        } else {
          this.toastService.displayToast("Wrong pin."); // TODO i18n
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
