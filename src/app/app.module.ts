import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HTTP } from "@ionic-native/http/ngx";
import { MyApp } from "./app.component";

/** Pages import */
import { TabsPage } from "../pages/tabs/tabs";

import { StartPage } from "../pages/start/start";
import { StoryMenuPage } from "../pages/storyMenu/storyMenu";

import { UserAccountPage } from "../pages/userAccount/userAccount";
import { CreateUserAccountPage } from "../pages/createUserAccount/createUserAccount";

import { SelectUserProfilePage } from "../pages/selectUserProfile/selectUserProfile";
import { CreateUserProfilePage } from "../pages/createUserProfile/createUserProfile";
import { SettingsPage } from "../pages/settings/settings";
import { AvailableStoriesPage } from "../pages/availableStories/availableStories";
import { StoryDetailsPage } from "../pages/storyDetails/storyDetails";
import { InfoPage } from "../pages/info/info";
import { PlayerPage } from "../pages/player/player";
import { ChangeUserAccountPinPage } from "../pages/change-user-account-pin/change-user-account-pin";

import { CreditsPage } from "../pages/credits/credits";
import { ImpressumPage } from "../pages/impressum/impressum";

/** Providers import */
import { AlertService } from "../providers/alert/alert";
import { StoryService} from "../providers/story/story";
import { SettingsService } from "../providers/settings/settings";
import { AnswerMatchingService } from "../providers/speechRecognition/answerMatching";
import { LanguageFileService } from "../providers/speechRecognition/languageFile";
import { TtsTextService} from "../providers/speechRecognition/ttsText";
import { StorageService } from "../providers/common/storage";
import { AudioService} from "../providers/audio/audio";
import { AuthService } from "../providers/auth/auth";

/** Ionic framework imports */
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicStorageModule } from "@ionic/storage";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { NativeAudio } from "@ionic-native/native-audio/ngx";
import { Globalization } from "@ionic-native/globalization/ngx";
import { File } from "@ionic-native/file/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { SaveGameService } from "../providers/savegame/savegame";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Zip } from "@ionic-native/zip/ngx";
import { PublicStoryHelperService } from "../providers/public-story-helper/public-story-helper";
//installed version 4.0.0 instead of latest, latest requires cordova-plugin-file@6.0.0 but file-transfer plugin requires cordova-plugin-file@5.0.0
import { Media } from "@ionic-native/media/ngx";
import { SimpleToastService} from "../providers/simple-toast/simple-toast";
import { LoggerService } from "../providers/logger/logger";
import { PlatformBridgeService } from "../providers/platform-bridge/platform-bridge";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    StartPage,
    UserAccountPage,
    CreateUserAccountPage,
    CreateUserProfilePage,
    ChangeUserAccountPinPage,
    SelectUserProfilePage,
    StoryMenuPage,
    SettingsPage,
    AvailableStoriesPage,
    StoryDetailsPage,
    InfoPage,
    PlayerPage,
    CreditsPage,
    ImpressumPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "__taletimedb",
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    StartPage,
    CreateUserAccountPage,
    CreateUserProfilePage,
    ChangeUserAccountPinPage,
    SelectUserProfilePage,
    UserAccountPage,
    StoryMenuPage,
    SettingsPage,
    AvailableStoriesPage,
    StoryDetailsPage,
    InfoPage,
    PlayerPage,
    CreditsPage,
    ImpressumPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertService,
    HTTP,
    StoryService,
    LoggerService,
    SettingsService,
    AnswerMatchingService,
    LanguageFileService,
    TtsTextService,
    File,
    Zip,
    FileTransfer,
    NativeAudio,
    TextToSpeech,
    SpeechRecognition,
    StorageService,
    AudioService,
    Globalization,
    SaveGameService,
    AuthService,
    PublicStoryHelperService,
    Media,
    SimpleToastService,
    PlatformBridgeService
  ]
})
export class AppModule {}
