import {TestBed} from "@angular/core/testing";

import {LanguageService} from "./language.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {
  MockedAlertController, MockedAppComponent,
  MockedAuthService, MockedLoadingController,
  MockedNavController,
  MockedSettingsService,
  MockedStorage, MockedToastService,
  MockedTranslateService
} from "../../../utils/karma/mocks";
import {Storage} from "@ionic/storage";
import {SettingsService} from "../settings/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../auth/auth.service";
import {SimpleToastService} from "../simple-toast/simple-toast.service";
import {AppComponent} from "../../app.component";
import {CreateUserAccountPage} from "../../pages/create-user-account/create-user-account.page";
import {platform} from "os";

let navController;
let storage;
let router : Router;
let location : Location;
let settingsService;
let translateService;
let authService;
let toastService;
let alertController;
let loadingController;
let appCompent;

function renewTestbed(){
  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes)],
    declarations: [
    ],
    providers: [
      {provide: NavController, useClass: MockedNavController},
      {provide: Storage, useClass: MockedStorage},
      {provide: SettingsService, useClass: MockedSettingsService},
      {provide: TranslateService, useClass: MockedTranslateService},
      {provide: AuthService, useClass: MockedAuthService},
      {provide: SimpleToastService, useClass: MockedToastService},
      {provide: AlertController, useClass: MockedAlertController},
      {provide: LoadingController, useClass: MockedLoadingController},
      {provide: AppComponent, useClass: MockedAppComponent}
    ]
  });

  navController = TestBed.get(NavController);
  storage = TestBed.get(Storage);
  router = TestBed.get(Router);
  location = TestBed.get(Location)
  settingsService = TestBed.get(SettingsService);
  translateService = TestBed.get(TranslateService);
  authService = TestBed.get(AuthService);
  toastService = TestBed.get(SimpleToastService);
  alertController = TestBed.get(AlertController);
  loadingController = TestBed.get(LoadingController);
  appCompent = TestBed.get(AppComponent)
}

describe('Set language', () =>{
  let languageService

  beforeEach(() => {
    renewTestbed()
    languageService = new LanguageService(translateService, storage);
    languageService.selected = null;
  });

  afterEach(() => {
    languageService = null
  });
  it('Language is german', () => {
    languageService.setLanguage("de-DE")
    expect(languageService.selected)
      .toEqual("de-DE")
  })
  it('Language is english', () => {
    languageService.setLanguage("en-US")
    expect(languageService.selected)
      .toEqual("en-US")
  })
})

// describe("LanguageService", () => {
//   beforeEach(() => TestBed.configureTestingModule({}));
//
//   it("should be created", () => {
//     const service: LanguageService = TestBed.get(LanguageService);
//     expect(service).toBeTruthy();
//   });
// });
