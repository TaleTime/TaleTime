import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  MenuController,
  NavController,
  Platform,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { AvailableLanguage } from "../../models/AvailableLanguage";
import { PlayerParams } from "../../models/player/player-params";
import { Reader, StoryInformation } from "../../models/storyInformation";
import { UserProfile } from "../../models/userProfile";
import { AuthService } from "../../services/auth/auth.service";
import { LanguageService } from "../../services/language/language.service";
import { PlayerParamsService } from "../../services/player-parmas/player-params.service";
import { ProfileService } from "../../services/profile/profile.service";
import { SettingsService } from "../../services/settings/settings.service";
import { SimpleToastService } from "../../services/simple-toast/simple-toast.service";
import { StoryInformationService } from "../../services/story-information/story-information.service";
import { StoryService } from "../../services/story/story.service";

@Component({
  selector: "app-story-menu",
  templateUrl: "./story-menu.page.html",
  styleUrls: ["./story-menu.page.scss"],
})
export class StoryMenuPage implements OnInit {
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;
  private activeUserProfile: UserProfile;
  public stories: Array<StoryInformation>;

  CANCEL_BUTTON_TOOLTIP_LABEL: string;
  PLAY_BUTTON_TOOLTIP_LABEL: string;
  INFO_BUTTON_TOOLTIP_LABEL: string;

  languageMap = new Map();

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastService: SimpleToastService,
    private translate: TranslateService,
    private settings: SettingsService,
    public platform: Platform,
    public router: Router,
    public playerParamsService: PlayerParamsService,
    public storyInformationService: StoryInformationService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    public storyService: StoryService,
    public profileService: ProfileService,
    public languageService: LanguageService
  ) {
    if (this.authService.currentUserAccount == null) {
      this.router.navigate(["/start"]);
    }
    this.languageMap.set("English", "en-US");
    this.languageMap.set("Deutsch", "de-DE");
  }

  ngOnInit() {
    this.stories = [];
    this.activeUserProfile = this.profileService.getActiveUserProfile();

    if (this.activeUserProfile) {
      this.activeUserProfileName = this.activeUserProfile.name;
      this.activeUserProfileAvatarName = this.activeUserProfile.avatar.name;
      //todo Ändern, dass nur noch Enum anstelle von Strings benutzt werden
      if (this.languageService.selected == "de-DE") {
        this.stories = this.activeUserProfile.getArrayOfStoriesByLanguage(
          AvailableLanguage.German
        );
      } else {
        this.stories = this.activeUserProfile.getArrayOfStoriesByLanguage(
          AvailableLanguage.English
        );
      }
    }
  }

  /**
   * Needed for automated language exchange in the tooltip of the buttons
   */
  ionViewWillEnter() {
    this.ngOnInit();
    this.translateHoverText();
  }

  /**
   * change the language of the tooltip
   */
  private translateHoverText() {
    this.CANCEL_BUTTON_TOOLTIP_LABEL = this.translate.instant(
      "DELETE_BUTTON_MOUSE_HOVER"
    );
    this.INFO_BUTTON_TOOLTIP_LABEL = this.translate.instant(
      "INFO_BUTTON_MOUSE_HOVER"
    );
    this.PLAY_BUTTON_TOOLTIP_LABEL = this.translate.instant(
      "PLAY_BUTTON_MOUSE_HOVER"
    );
  }

  /**
   * Checks if the story is available in the current language
   *
   * @param storyInformation Story to check language
   * @return True if story available in the current language, else false
   */
  private checkLanguage(storyInformation: StoryInformation) {
    if (
      this.settings.language ===
      this.storyLanguageToSystemLanguage(storyInformation.language)
    ) {
      return true;
    }
    return false;
  }

  /**
   * Converts the Story-language-format (English, Deutsch, etc.) to
   * System-language-format (en-US, de-DE, etc.)
   *
   * @param storyLanguage Language in Story-format
   * @return Language in Story-format
   */
  private storyLanguageToSystemLanguage(storyLanguage: string) {
    return this.languageMap.get(storyLanguage);
  }

  goToSelectUserProfilePage() {
    this.navCtrl.navigateForward("/select-user-profile");
  }

  showDetails(story: StoryInformation) {
    this.storyInformationService.storyInformation = story;
    this.router.navigate(["/story-details"]);
  }

  deleteStory(story: StoryInformation) {
    this.activeUserProfile.deleteStory(story.id);
    this.ionViewWillEnter();
  }

  async goToPlayerPage(storyId: string) {
    let playerParams = new PlayerParams();
    playerParams.storyId = storyId;

    const alert = await this.showResumeOrRestartDialog((valid) => {
      if (valid === "begin") {
        playerParams.mode = "begin";
        this.playerParamsService.setPlayerParams(playerParams);
        this.router.navigate(["/player"]);
      } else {
        playerParams.mode = "continue";
        this.playerParamsService.setPlayerParams(playerParams);
        this.router.navigate(["/player"]);
      }
    });

    await alert.present();
  }

  public showResumeOrRestartDialog(
    modeFn: (arg) => void,
    cancelFn?: (arg) => void
  ) {
    return this.alertCtrl.create({
      header: this.translate.instant("RESUME_OR_RESTART"),
      inputs: [],
      buttons: [
        {
          text: this.translate.instant("RESUME"),
          role: "resume",
          handler: (data) => {
            modeFn("continue");
          },
        },
        {
          text: this.translate.instant("RESTART"),
          role: "restart",
          handler: (data) => {
            modeFn("begin");
          },
        },
        {
          text: this.translate.instant("CANCEL"),
          role: "cancel",
          handler: (data) => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              console.log("Cancel clicked");
            }
          },
        },
      ],
    });
  }

  goToSelectUserProfile() {
    this.router.navigate(["/select-user-profile"]);
  }

  goToAvailableStories() {
    this.router.navigate(["/tabs/available-stories"]);
  }

  getSubtitle(r: Reader) {
    return " " + r.name;
  }
}
