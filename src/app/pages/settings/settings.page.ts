import {Component} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../../services/settings/settings.service";
import {Router} from "@angular/router";

import {
  AVAILABLE_LANGUAGES,
  FONT_SIZE_12_LABEL,
  FONT_SIZE_12_VALUE,
  FONT_SIZE_14_LABEL,
  FONT_SIZE_14_VALUE,
  FONT_SIZE_16_LABEL,
  FONT_SIZE_16_VALUE,
  FONT_SIZE_18_LABEL,
  FONT_SIZE_18_VALUE,
  TTS_RATE_FAST,
  TTS_RATE_FAST_VALUE,
  TTS_RATE_NORMAL,
  TTS_RATE_NORMAL_VALUE,
  TTS_RATE_SLOW,
  TTS_RATE_SLOW_VALUE,
} from "../../constants/constants";
import {NavController} from "@ionic/angular";
import {ProfileService} from "../../services/profile/profile.service";
import {LanguageService} from "../../services/language/language.service";

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
    private router: Router,
    public settings: SettingsService,
    private translate: TranslateService,
    private authService: AuthService,
    private profilService: ProfileService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
    const activeUserProfile = this.profilService.getActiveUserProfile();
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

    switch (this.settings.fontSize) {
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

  static getCodeFromLanguage(lang: string): string {
    for (const l of AVAILABLE_LANGUAGES) {
      if (l.name === lang) {
        return l.code;
      }
    }
    return null;
  }

  static getLanguageFromCode(code: string) {
    for (const l of AVAILABLE_LANGUAGES) {
      if (l.code === code) {
        return l.name;
      }
    }
    return null;
  }

  public changeLanguage(selectedLanguage) {
    console.log("Changing language to <" + selectedLanguage + ">");
    this.translate.use(SettingsPage.getCodeFromLanguage(selectedLanguage));
    this.settings.language = SettingsPage.getCodeFromLanguage(selectedLanguage);
    this.languageService.selected = this.settings.language;
  }

  changeFontSize(selectedFontSize) {
    console.log("Changing font size to <" + selectedFontSize + ">");
    switch (selectedFontSize) {
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

  changeTtsRate(ttsRate) {
    console.log("Changing TTS rate to <" + ttsRate + ">");

    switch (ttsRate) {
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
    this.router.navigate(["/user-account"]);
  }

  goToSelectUserProfile() {
    this.router.navigate(["/select-user-profile"]);
  }

  public goToCreditsPage(): void {
    this.navCtrl.navigateForward("/credits");
  }

  public goToLegalInformationPage(): void {
    this.navCtrl.navigateForward("/legal-information");
  }
}
