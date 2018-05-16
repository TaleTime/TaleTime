import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsPage } from "../pages/settings/settings";
import { AvailableStoriesPage } from "../pages/availableStories/availableStories";
import { InfoPage } from "../pages/info/info";

import { AVAILABLE_LANGUAGES, DEFAULT_LANG } from "./constants"; // added 2017-11-14
import { Globalization } from "@ionic-native/globalization"; // added 2017-11-14
import { SettingsProvider } from "../providers/settings/settings"; // added 2017-11-14
import { Subscription } from "rxjs/Subscription"; // added 2017-11-14
import { TranslateService } from '@ngx-translate/core'; // added for translation 2017-11-14

import { StartPage } from '../pages/start/start';
import { TabsPage } from '../pages/tabs/tabs';
import { LoggerProvider } from '../providers/logger/logger';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;

  pages: Array<{ title: string, component: any }>;

  private settingsSubscription: Subscription;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private settings: SettingsProvider,
    private translate: TranslateService,
    private logger: LoggerProvider,
    private globalization: Globalization) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // TODO add here the storage for user permission
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.translate.setDefaultLang(DEFAULT_LANG);

      this.settingsSubscription = this.settings.onSettingsLoaded().subscribe(
        () => {
          if (this.settings.language == null) {
            this.globalization.getPreferredLanguage().then(
              (result) => {
                this.logger.log("Preferred language of this device is " + result.value);
                let language = this.getSuitableLanguage(result.value);
                this.translate.use(language);
                this.settings.language = language;
              }
            );
          } else {
            this.translate.use(this.settings.language);
          }
        }
      );
    });
  }

  pushPage(page) {
    // we want the back button to show in this scenario
    this.nav.push(page.component);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return AVAILABLE_LANGUAGES.some(x => x.code == language) ? language : DEFAULT_LANG;
  }
}
