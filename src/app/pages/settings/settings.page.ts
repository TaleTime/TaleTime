import {Component} from "@angular/core";

import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";
import {AuthService} from "../../services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {SettingsService} from "../../services/settings/settings.service";
import {Storage} from "@ionic/storage";

import {
  AVAILABLE_LANGUAGES,
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
  ttsRate;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public settings: SettingsService,
    private translate: TranslateService,
    private authService: AuthService,
    private toastService: SimpleToastService,
  ) {

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
      valid = true; // TODO silly hack (obviously)

      if (valid) {
        this.navCtrl.navigateForward("/user-account");
      } else {
        this.toastService.displayToast("Wrong pin."); // TODO tobi i18
        return false;
      }
    });

    await alert.present();
  }

  public goToCreditsPage(): void {
    this.navCtrl.navigateForward("/credits");
  }

  public goToLegalInformationPage(): void {
    this.navCtrl.navigateForward("/legal-information");
  }
}
