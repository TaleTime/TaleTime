import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core"; // added for translation 2017-11-14
import { SettingsProvider } from "../../providers/settings/settings";
import { AuthProvider } from "../../providers/auth/auth";
import { UserAccountPage } from "../../pages/userAccount/userAccount";
import { SimpleToastProvider } from "../../providers/simple-toast/simple-toast";
import { CreditsPage } from "../../pages/credits/credits";
import { ImpressumPage } from "../../pages/impressum/impressum";

import {
  AVAILABLE_LANGUAGES,
  TTS_RATE_FAST,
  TTS_RATE_FAST_VALUE,
  TTS_RATE_NORMAL,
  TTS_RATE_NORMAL_VALUE,
  TTS_RATE_SLOW,
  TTS_RATE_SLOW_VALUE
} from "../../app/constants";

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  languages = AVAILABLE_LANGUAGES;
  ttsRates = [TTS_RATE_SLOW, TTS_RATE_NORMAL, TTS_RATE_FAST];
  selectedLanguage;
  ttsRate;

  constructor(
    public navCtrl: NavController,
    private settings: SettingsProvider,
    private translate: TranslateService,
    private authProvider: AuthProvider,
    private toastProvider: SimpleToastProvider
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

  public goToUserAccount(): void {
    let alert = this.authProvider.presentPinPrompt((valid) => {
      if (valid) {
        this.navCtrl.push(UserAccountPage);
      } else {
        this.toastProvider.displayToast("Wrong pin."); // TODO tobi i18
        return false;
      }
    });

    alert.present();
  }

  public goToCreditspage(): void {
    this.navCtrl.push(CreditsPage);
  }

  public goToImpressumpage(): void {
    this.navCtrl.push(ImpressumPage);
  }

  private static getCodeFromLanguage(lang: string): string {
    for (let l of AVAILABLE_LANGUAGES) {
      if (l.name === lang) {
        return l.code;
      }
    }
    return null;
  }

  private static getLanguageFromCode(code: string) {
    for (let l of AVAILABLE_LANGUAGES) {
      if (l.code === code) {
        return l.name;
      }
    }
    return null;
  }
}
