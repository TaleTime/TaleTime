import {Component} from "@angular/core";

import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";
import {AuthService} from "../../services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../../services/settings/settings.service";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

import {
  AVAILABLE_LANGUAGES,
  FONT_SIZE_12_LABEL,
  FONT_SIZE_12_VALUE,
  FONT_SIZE_14_LABEL,
  FONT_SIZE_14_VALUE,
  FONT_SIZE_16_LABEL, FONT_SIZE_16_VALUE, FONT_SIZE_18_LABEL, FONT_SIZE_18_VALUE,
  TTS_RATE_FAST,
  TTS_RATE_FAST_VALUE,
  TTS_RATE_NORMAL,
  TTS_RATE_NORMAL_VALUE,
  TTS_RATE_SLOW,
  TTS_RATE_SLOW_VALUE
} from "../../constants/constants";
import {NavController} from "@ionic/angular";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage {

  languages = AVAILABLE_LANGUAGES;
  ttsRates = [TTS_RATE_SLOW, TTS_RATE_NORMAL, TTS_RATE_FAST];
  selectedLanguage;
  selectedFontSize;
  ttsRate;

  activeUserProfileName: string;
  activeUserProfileAvatarName: string;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private router: Router,
    public settings: SettingsService,
    private translate: TranslateService,
    private authService: AuthService,
    private toastService: SimpleToastService,
  ) {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }
  }

  ngOnInit() {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }
    const activeUserProfile = this.authService.getActiveUserProfile();
    console.log("STORY_MENU_CURRENT_USER: ", this.authService.currentUserAccount);
    if (activeUserProfile) {
      this.activeUserProfileName = activeUserProfile.name;
      this.activeUserProfileAvatarName = activeUserProfile.avatar.name;
    }

    this.selectedLanguage = SettingsPage.getLanguageFromCode(
      this.settings.language
    );

    switch (this.settings.ttsRate) {
      case TTS_RATE_SLOW_VALUE:
        this.ttsRate = TTS_RATE_SLOW;
        break;
      case TTS_RATE_NORMAL_VALUE:
        this.ttsRate = TTS_RATE_NORMAL;
        break;
      case TTS_RATE_FAST_VALUE:
        this.ttsRate = TTS_RATE_FAST;
        break;
      default:
        this.ttsRate = TTS_RATE_NORMAL;
    }

    switch (this.settings.fontSize){
      case FONT_SIZE_12_VALUE:
        this.selectedFontSize = FONT_SIZE_12_LABEL;
        break;
      case FONT_SIZE_14_VALUE:
        this.selectedFontSize = FONT_SIZE_14_LABEL;
        break;
      case FONT_SIZE_16_VALUE:
        this.selectedFontSize = FONT_SIZE_16_LABEL;
        break;
      case FONT_SIZE_18_VALUE:
        this.selectedFontSize = FONT_SIZE_18_LABEL;
        break;
    }
  }

  private static getCodeFromLanguage(lang: string): string {
    for (const l of AVAILABLE_LANGUAGES) {
      if (l.name === lang) {
        return l.code;
      }
    }
    return null;
  }

  private static getLanguageFromCode(code: string) {
    for (const l of AVAILABLE_LANGUAGES) {
      if (l.code === code) {
        return l.name;
      }
    }
    return null;
  }

  changeLanguage() {
    console.log("Changing language to <" + this.selectedLanguage + ">");
    this.translate.use(SettingsPage.getCodeFromLanguage(this.selectedLanguage));
    this.settings.language = SettingsPage.getCodeFromLanguage(
      this.selectedLanguage
    );
  }

  changeFontSize(){
    console.log("Changing font size to <" + this.selectedFontSize + ">");
    switch (this.selectedFontSize){
      case FONT_SIZE_12_LABEL:
        this.settings.fontSize = FONT_SIZE_12_VALUE;
        break;
      case FONT_SIZE_14_LABEL:
        this.settings.fontSize = FONT_SIZE_14_VALUE;
        break;
      case FONT_SIZE_16_LABEL:
        this.settings.fontSize = FONT_SIZE_16_VALUE;
        break;
      case FONT_SIZE_18_LABEL:
        this.settings.fontSize = FONT_SIZE_18_VALUE;
        break;
    }
  }

  changeTtsRate() {
    console.log("Changing TTS rate to <" + this.ttsRate + ">");

    switch (this.ttsRate) {
      case TTS_RATE_SLOW:
        this.settings.ttsRate = TTS_RATE_SLOW_VALUE;
        break;
      case TTS_RATE_NORMAL:
        this.settings.ttsRate = TTS_RATE_NORMAL_VALUE;
        break;
      case TTS_RATE_FAST:
        this.settings.ttsRate = TTS_RATE_FAST_VALUE;
        break;
    }
  }

  public async goToUserAccount() {
    const alert = await this.authService.presentPinPrompt((valid) => {
      if (valid) {
        this.router.navigate(["/user-account"]);
      } else {
        this.toastService.displayToast("Wrong pin."); // TODO tobi i18
        return false;
      }
    });

    await alert.present();
  }

  goToSelectUserProfile(){
    this.router.navigate(["/select-user-profile"]);
  }

  public goToCreditsPage(): void {
    this.navCtrl.navigateForward("/credits");
  }

  public goToLegalInformationPage(): void {
    this.navCtrl.navigateForward("/legal-information");
  }
}
