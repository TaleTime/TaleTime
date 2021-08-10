import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { ProfileService } from "../../services/profile/profile.service";
import { SettingsService } from "../../services/settings/settings.service";
import { SimpleToastService } from "../../services/simple-toast/simple-toast.service";

@Component({
  selector: "app-select-user-profile",
  templateUrl: "./select-user-profile.page.html",
  styleUrls: ["./select-user-profile.page.scss"],
})
export class SelectUserProfilePage implements OnInit {
  isShowingOptions: boolean;
  isShowingOptionsButton = false;
  showingOptionsLabel: string;
  userProfiles: Observable<any[]>;

  constructor(
    private navCtrl: NavController,
    private settingsService: SettingsService,
    private router: Router,
    private translate: TranslateService,
    public authService: AuthService,
    public modalCtrl: ModalController,
    private toastService: SimpleToastService,
    public profileService: ProfileService
  ) {
    this.userProfiles = this.profileService.getUserProfiles();
    this.isShowingOptions = true;
    this.translate.get("COMMON_EDIT").subscribe((value) => {
      // value is our translated string
      this.showingOptionsLabel = value;
    });
    const activeUserProfile = this.profileService.getActiveUserProfile();
    if (activeUserProfile && !activeUserProfile.child) {
      this.isShowingOptionsButton = true;
    }
  }

  public select(event, userProfileId: string) {
    event.stopPropagation();
    this.profileService.setActiveUserProfile(userProfileId).subscribe(
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
    this.profileService.deleteUserProfile(userProfileId);
  }

  public create() {
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

  ngOnInit() {}

  onSignOut() {
    this.logout();
  }

  public logout() {
    this.authService.logout().subscribe((success) => {
      this.router.navigate([""]);
    });
  }
}
