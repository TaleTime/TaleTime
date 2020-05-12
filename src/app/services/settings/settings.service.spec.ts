import {TestBed} from "@angular/core/testing";
import {LoggerService} from "../logger/logger.service";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";
import {AlertService} from "../alert/alert.service";
import {Platform} from "@ionic/angular";

import {
  MockedAlertController, MockedAlertService, MockedAppComponent,
  MockedAuthService, MockedLanguageFileService, MockedLoadingController,
  MockedNavController, MockedPlatform,
  MockedRouter,
  MockedSettingsService, MockedSpeechRecognitionService,
  MockedStorage, MockedToastService,
  MockedTranslateService
} from "src/utils/karma/mocks"

import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {SettingsService} from "../../services/settings/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth/auth.service";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";
import {
  FONT_SIZE_12_LABEL,
  FONT_SIZE_12_VALUE,
  FONT_SIZE_14_LABEL,
  FONT_SIZE_14_VALUE, FONT_SIZE_16_LABEL,
  FONT_SIZE_16_VALUE,
  FONT_SIZE_18_LABEL,
  FONT_SIZE_18_VALUE,
  TTS_RATE_FAST,
  TTS_RATE_FAST_VALUE,
  TTS_RATE_NORMAL,
  TTS_RATE_NORMAL_VALUE,
  TTS_RATE_SLOW,
  TTS_RATE_SLOW_VALUE
} from "../../constants/constants";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AppRoutingModule, routes} from "../../app-routing.module";
import {UserAccount} from "../../models/userAccount";
import {UserProfile} from "../../models/userProfile";
import {AppComponent} from "../../app.component";
import {CreateUserAccountPage} from "../../pages/create-user-account/create-user-account.page";
import {LanguageFileService} from "../speech-recognition/language-file/language-file.service";
import {Logger} from "@angular/compiler-cli/ngcc";

let navController
let storage
let router : Router
let location : Location
let translateService
let authService
let toastService
let alertController
let loadingController
let appCompent
let platform
let languageFileService
let speechRecognitionService
let loggerService
let alertService

function renewTestbed(){
  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes)],
    declarations: [
    ],
    providers: [
      {provide: NavController, useClass: MockedNavController},
      {provide: Storage, useClass: MockedStorage},
      {provide: TranslateService, useClass: MockedTranslateService},
      {provide: AuthService, useClass: MockedAuthService},
      {provide: SimpleToastService, useClass: MockedToastService},
      {provide: AlertController, useClass: MockedAlertController},
      {provide: LoadingController, useClass: MockedLoadingController},
      {provide: AppComponent, useClass: MockedAppComponent},
      {provide: Platform, useClass: MockedPlatform},
      {provide: LanguageFileService, useClass: MockedLanguageFileService},
      {provide: SpeechRecognition, useClass: MockedSpeechRecognitionService},
      {provide: LoggerService, useClass: MockedSpeechRecognitionService},
      {provide: AlertService, useClass: MockedAlertService}
    ]
  });

  navController = TestBed.get(NavController)
  storage = TestBed.get(Storage)
  router = TestBed.get(Router)
  location = TestBed.get(Location)
  translateService = TestBed.get(TranslateService)
  authService = TestBed.get(AuthService)
  toastService = TestBed.get(SimpleToastService)
  alertController = TestBed.get(AlertController)
  loadingController = TestBed.get(LoadingController)
  appCompent = TestBed.get(AppComponent)
  languageFileService = TestBed.get(LanguageFileService)
  speechRecognitionService = TestBed.get(SpeechRecognition)
  loggerService = TestBed.get(SpeechRecognition)
  alertService = TestBed.get(AlertService)
  platform = TestBed.get(Platform)

}

describe('Test get and set interaction', () =>{
  let settingsService

  beforeEach(() => {
    renewTestbed()

    settingsService = new SettingsService(authService, platform, languageFileService, storage, speechRecognitionService,
      loggerService, alertService)
  });

  afterEach(() => {
    settingsService = null
  });
  it('Testing interaction true', () => {
    settingsService.settings.interaction = true
    expect(settingsService.interaction)
      .toBeTrue()
  })
  it('Testing interaction false', () => {
    settingsService.settings.interaction = false
    expect(settingsService.interaction)
      .toBeFalse()
  })
})

describe('Testing TTS Rate', () =>{
  let settingsService

  beforeEach(() => {
    renewTestbed()
    settingsService =  new SettingsService(authService, platform, languageFileService, storage,
      speechRecognitionService, loggerService, alertService)
    authService.currentUser = null
  });

  afterEach(() => {
    settingsService = null
  });
  it('Testing TTS Rate 1', () => {
    settingsService.settings.ttsRate = TTS_RATE_SLOW_VALUE
    expect(settingsService.ttsRate)
      .toEqual(0.5)
  })
  it('Testing TTS Rate 2', () => {
    settingsService.settings.ttsRate = TTS_RATE_NORMAL_VALUE
    expect(settingsService.ttsRate)
      .toEqual(0.75)
  })
  it('Testing TTS Rate 2', () => {
    settingsService.settings.ttsRate = TTS_RATE_FAST_VALUE
    expect(settingsService.ttsRate)
      .toEqual(1)
  })
})

describe('Testing font size', () =>{
  let settingsService

  beforeEach(() => {
    renewTestbed()
    settingsService =  new SettingsService(authService, platform, languageFileService, storage,
      speechRecognitionService, loggerService, alertService)
    authService.currentUser = null
  });

  afterEach(() => {
    settingsService = null
  });
  it('Testing Font Size 12', () => {
    settingsService.settings.ttsRate = FONT_SIZE_12_VALUE
    expect(settingsService.settings.ttsRate)
      .toEqual(12)
  })
  it('Testing Font Size 14', () => {
    settingsService.settings.ttsRate = FONT_SIZE_14_VALUE
    expect(settingsService.settings.ttsRate)
      .toEqual(14)
  })
  it('Testing Font Size 16', () => {
    settingsService.settings.ttsRate = FONT_SIZE_16_VALUE
    expect(settingsService.settings.ttsRate)
      .toEqual(16)
  })
  it('Testing Font Size 18', () => {
    settingsService.settings.ttsRate = FONT_SIZE_18_VALUE
    expect(settingsService.settings.ttsRate)
      .toEqual(18)
  })
})

describe('Test get and set language', () =>{
  let settingsService

  beforeEach(() => {
    renewTestbed()

    settingsService = new SettingsService(authService, platform, languageFileService, storage, speechRecognitionService,
      loggerService, alertService)
  });

  afterEach(() => {
    settingsService = null
  });
  it('Testing interaction true', () => {
    settingsService.settings.language = "de-DE"
    expect(settingsService.language)
      .toEqual("de-DE")
  })
  it('Testing interaction false', () => {
    settingsService.settings.language = "en-US"
    expect(settingsService.language)
      .toEqual("en-US")
  })
})

// describe("SettingsService", () => {
//   beforeEach(() => TestBed.configureTestingModule({}));
//
//   it("should be created", () => {
//     const service: SettingsService = TestBed.get(SettingsService);
//     expect(service).toBeTruthy();
//   });
// });
