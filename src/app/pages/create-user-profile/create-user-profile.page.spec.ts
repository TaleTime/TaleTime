import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {
  MockedAlertController,
  MockedAuthService, MockedLoadingController,
  MockedNavController,
  MockedRouter,
  MockedSettingsService,
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
import {CreateUserAccountPage} from "../create-user-account/create-user-account.page";
import {CreateUserProfilePage} from "./create-user-profile.page";

let navController;
let storage;
let router : Router;
let location : Location;
let settingsService;
let translateService;
let authService;
let toastService;

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
      {provide: LoadingController, useClass: MockedLoadingController}
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
}

/*
 * Test registration
 */
// describe('Test registration', () =>{
//   let createUserProfilePage
//
//   beforeEach(() => {
//     renewTestbed()
//     createUserProfilePage =  new CreateUserProfilePage(navController, router, authService);
//     authService.currentUser.profile = null
//   });
//
//   afterEach(() => {
//     createUserProfilePage = null
//   });
//   it('Testing Test User 1', () => {
//     createUserProfilePage.registerCredentials = {name: "Test User 1", email: "testuser@testmail.org", pin: "3456"}
//     createUserProfilePage.register()
//     expect(authService.currentUser.name)
//       .toEqual("Test User 1")
//     expect(authService.currentUser.email)
//       .toEqual("testuser@testmail.org")
//   })
// })

// describe("CreateUserProfilePage", () => {
//   let component: CreateUserProfilePage;
//   let fixture: ComponentFixture<CreateUserProfilePage>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CreateUserProfilePage],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreateUserProfilePage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
