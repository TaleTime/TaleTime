import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";

import {IonicModule, IonicRouteStrategy} from "@ionic/angular";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
/** Services import */
import {AlertService} from "./services/alert/alert.service";
import {StoryService} from "./services/story/story.service";
import {SettingsService} from "./services/settings/settings.service";
import {AnswerMatchingService} from "./services/speech-recognition/answer-matching/answer-matching.service";
import {LanguageFileService} from "./services/speech-recognition/language-file/language-file.service";
import {TtsTextService} from "./services/speech-recognition/tts-text/tts-text.service";
import {StorageService} from "./services/storage/storage.service";
import {AudioService} from "./services/audio/audio.service";
import {AuthService} from "./services/auth/auth.service";
import {SimpleToastService} from "./services/simple-toast/simple-toast.service";
import {LoggerService} from "./services/logger/logger.service";
import {PlatformBridgeService} from "./services/platform-bridge/platform-bridge.service";
import {PublicStoryHelperService} from "./services/public-story-helper/public-story-helper.service";
import {SaveGameService} from "./services/save-game/save-game.service";
/** Ionic framework imports */
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {IonicStorageModule} from "@ionic/storage";
import {TextToSpeech} from "@ionic-native/text-to-speech/ngx";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {Globalization} from "@ionic-native/globalization/ngx";
import {File} from "@ionic-native/file/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {FileTransfer} from "@ionic-native/file-transfer/ngx";
import {Zip} from "@ionic-native/zip/ngx";
import {Media} from "@ionic-native/media/ngx";

import {HTTP} from "@ionic-native/http/ngx";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {PlayerParamsService} from "./services/player-parmas/player-params.service";
import {PlayerParams} from "./models/player/player-params";
import {StoryInformationService} from "./services/story-information/story-information.service";
import {StoryInformation} from "./models/storyInformation";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/** firebase */
import {NgxAuthFirebaseUIModule} from "ngx-auth-firebaseui";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AngularFireModule} from "@angular/fire";
import {FireBaseService} from "./services/firebase/firebaseService";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function initAuthorization(appLoadService: AuthService) {
  return () => appLoadService.ready();
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebaseConfig,
      () => "",
      environment.advancedFirebaseConfig
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    CommonModule,
  ],
  providers: [
    StatusBar,
    PlayerParamsService,
    PlayerParams,
    StoryInformationService,
    StoryInformation,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
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
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthorization,
      deps: [AuthService],
      multi: true,
    },
    PublicStoryHelperService,
    Media,
    SimpleToastService,
    PlatformBridgeService,
    FireBaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
