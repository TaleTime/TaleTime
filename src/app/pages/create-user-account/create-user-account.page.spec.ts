import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {
  MockedAlertController, MockedAppComponent,
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
import {SettingsPage} from "../settings/settings.page";
import {CreateUserAccountPage} from "./create-user-account.page";
import {AppComponent} from "../../app.component";

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

/*
 * Test registration
 */
describe('Test registration', () =>{
  let createUserAccountPage

  beforeEach(() => {
    renewTestbed()
    createUserAccountPage =  new CreateUserAccountPage(router, navController, authService, alertController,
      loadingController, translateService, appCompent);
    authService.currentUser = null
  });

  afterEach(() => {
    createUserAccountPage = null
  });
  it('Testing Test User 1', () => {
    createUserAccountPage.registerCredentials = {name: "Test User 1", email: "testuser@testmail.org", pin: "3456"}
    createUserAccountPage.register()
    expect(authService.currentUser.name)
      .toEqual("Test User 1")
    expect(authService.currentUser.email)
      .toEqual("testuser@testmail.org")
  })
  it('Testing Test User 2', () => {
    createUserAccountPage.registerCredentials = {name: "Test User 2", email: "testuser234234@testmail.org", pin: "344456"}
    createUserAccountPage.register()
    expect(authService.currentUser.name)
      .toEqual("Test User 2")
    expect(authService.currentUser.email)
      .toEqual("testuser234234@testmail.org")
  })
  it('Testing Test User 3', () => {
    createUserAccountPage.registerCredentials = {name: "Test User 3", email: "blaasldk@gmail.com", pin: "password"}
    createUserAccountPage.register()
    expect(authService.currentUser.name)
      .toEqual("Test User 3")
    expect(authService.currentUser.email)
      .toEqual("blaasldk@gmail.com")
  })
})

//TODO Move to own file

describe('Test create User', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = null;
  });

  afterEach(() => {
    userAccount = null
  });

  it('Created User 2', () => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
    expect(userAccount.name)
      .toEqual("User 1")
    expect(userAccount.email)
      .toEqual("bla@bla.de")
    expect(userAccount.uid)
      .toEqual("12341")
  });
  it('Created User 3', () => {
    userAccount = new UserAccount("User 2", "bla2@bla.de", "12342")
    expect(userAccount.name)
      .toEqual("User 2")
    expect(userAccount.email)
      .toEqual("bla2@bla.de")
    expect(userAccount.uid)
      .toEqual("12342")
  });
  it('Created User 1', () => {
    userAccount = new UserAccount("User 3", "bla3@bla.de", "12343")
    expect(userAccount.name)
      .toEqual("User 3")
    expect(userAccount.email)
      .toEqual("bla3@bla.de")
    expect(userAccount.uid)
      .toEqual("12343")
  });
})


describe('Test update pin', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Setting pin 1234', () => {
    userAccount.updatePin("1234")
    expect(userAccount.hash)
      .toEqual("03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4")
  });
  it('Setting pin sadadasdasda', () => {
    userAccount.updatePin("sadadasdasda")
    expect(userAccount.hash)
      .toEqual("d376e13faad93a8265441852843e2640ba122c16d248433eeb8a8ba08edad596")
  });
  it('Setting pin 2131321233213211212313213232321321323213232323232132', () => {
    userAccount.updatePin("2131321233213211212313213232321321323213232323232132")
    expect(userAccount.hash)
      .toEqual("3570dbd923b81dd9eb28269d0ee568d29fa9c3bb4cc35ea3746262e04e469090")
  });
})


describe('Test check pin', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Checking pin 1234 true', () => {
    userAccount.updatePin("1234")
    expect(userAccount.checkPin("1234"))
      .toEqual(true)
  });
  it('Checking pin sadadasdasda true', () => {
    userAccount.updatePin("sadadasdasda")
    expect(userAccount.checkPin("sadadasdasda"))
      .toEqual(true)
  });
  it('Checking pin 2131321233213211212313213232321321323213232323232132 true', () => {
    userAccount.updatePin("2131321233213211212313213232321321323213232323232132")
    expect(userAccount.checkPin("2131321233213211212313213232321321323213232323232132"))
      .toEqual(true)
  });
  it('Checking pin 1234 false', () => {
    userAccount.updatePin("1234")
    expect(userAccount.checkPin("3rwrsf34f43f3f"))
      .toEqual(false)
  });
  it('Checking pin sadadasdasda false', () => {
    userAccount.updatePin("sadadasdasda")
    expect(userAccount.checkPin("34t43535gdfdgrd"))
      .toEqual(false)
  });
  it('Checking pin 2131321233213211212313213232321321323213232323232132 false', () => {
    userAccount.updatePin("2131321233213211212313213232321321323213232323232132")
    expect(userAccount.checkPin("234fesfewfwefwefw"))
      .toEqual(false)
  });
})


describe('Test check credentials', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Checking Email asdads@sadas.de and pin 1234 true', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("1234")
    expect(userAccount.checkPin("1234"))
      .toEqual(true)
  });
  it('Checking Email asdads@sadas.de and pin sadadasdasda true', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("sadadasdasda")
    expect(userAccount.checkPin("sadadasdasda"))
      .toEqual(true)
  });
  it('Checking Email asdads@sadas.de and pin 2131321233213211212313213232321321323213232323232132 true', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("2131321233213211212313213232321321323213232323232132")
    expect(userAccount.checkPin("2131321233213211212313213232321321323213232323232132"))
      .toEqual(true)
  });
  it('Checking Email asdads@sadas.de and pin 1234 false', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("1234")
    expect(userAccount.checkPin("3rwrsf34f43f3f"))
      .toEqual(false)
  });
  it('Checking Email asdads@sadas.de and pin sadadasdasda false', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("sadadasdasda")
    expect(userAccount.checkPin("34t43535gdfdgrd"))
      .toEqual(false)
  });
  it('Checking Email asdads@sadas.de and pin 2131321233213211212313213232321321323213232323232132 false', () => {
    userAccount.email = "asdads@sadas.de"
    userAccount.updatePin("2131321233213211212313213232321321323213232323232132")
    expect(userAccount.checkPin("234fesfewfwefwefw"))
      .toEqual(false)
  });

})

describe('Test add user profile', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Test add user profile 1', () => {
    let userProfile = new UserProfile("User 1", 1, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 1")
  });
  it('Test add user profile 2', () => {
    let userProfile = new UserProfile("User 2", 3, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 2")
  });
  it('Test add user profile 3', () => {
    let userProfile = new UserProfile("User 3", 2, true)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 3")
  });
  it('Test add user profile 4', () => {
    let userProfile = new UserProfile("User 4", 3, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 4")
  });
  it('Test add user profile 5', () => {
    let userProfile = new UserProfile("User 5", 2, true)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 5")
  });
})

describe('Test remove user profile', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Test add and remove user profile 1', () => {
    let userProfile = new UserProfile("User 1", 1, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 1")
    userAccount.removeUserProfile(userProfile.id)
    expect(userAccount.userProfiles.get(userProfile.id))
      .toBeUndefined()
  });
  it('Test add and remove user profile 2', () => {
    let userProfile = new UserProfile("User 2", 3, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 2")
    userAccount.removeUserProfile(userProfile.id)
    expect(userAccount.userProfiles.get(userProfile.id))
      .toBeUndefined()
  });
  it('Test add and remove user profile 3', () => {
    let userProfile = new UserProfile("User 3", 2, true)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 3")
    userAccount.removeUserProfile(userProfile.id)
    expect(userAccount.userProfiles.get(userProfile.id))
      .toBeUndefined()
  });
  it('Test add and remove user profile 4', () => {
    let userProfile = new UserProfile("User 4", 3, false)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 4")
    userAccount.removeUserProfile(userProfile.id)
    expect(userAccount.userProfiles.get(userProfile.id))
      .toBeUndefined()
  });
  it('Test add and remove user profile 5', () => {
    let userProfile = new UserProfile("User 5", 2, true)
    userAccount.addUserProfile(userProfile)
    expect(userAccount.userProfiles.get(userProfile.id).name)
      .toEqual("User 5")
    userAccount.removeUserProfile(userProfile.id)
    expect(userAccount.userProfiles.get(userProfile.id))
      .toBeUndefined()
  });
})

describe('Test add user and set active user profile', () =>{
  let userAccount : UserAccount

  beforeEach(() => {
    userAccount = new UserAccount("User 1", "bla@bla.de", "12341")
  });

  afterEach(() => {
    userAccount = null
  });

  it('Test add user profile 1 and set active user profile', () => {
    let userProfile = new UserProfile("User 1", 1, false)
    userAccount.addUserProfile(userProfile)
    userAccount.setActiveUserProfile(userProfile.id)
    expect(userAccount.activeUserProfile.name)
      .toEqual("User 1")
  });
  it('Test add user profile 2 and set active user profile', () => {
    let userProfile = new UserProfile("User 2", 3, false)
    userAccount.addUserProfile(userProfile)
    userAccount.setActiveUserProfile(userProfile.id)
    expect(userAccount.activeUserProfile.name)
      .toEqual("User 2")
  });
  it('Test add user profile 3 and set active user profile', () => {
    let userProfile = new UserProfile("User 3", 2, true)
    userAccount.addUserProfile(userProfile)
    userAccount.setActiveUserProfile(userProfile.id)
    expect(userAccount.activeUserProfile.name)
      .toEqual("User 3")
  });
  it('Test add user profile 4 and set active user profile', () => {
    let userProfile = new UserProfile("User 4", 3, false)
    userAccount.addUserProfile(userProfile)
    userAccount.setActiveUserProfile(userProfile.id)
    expect(userAccount.activeUserProfile.name)
      .toEqual("User 4")
  });
  it('Test add user profile 5 and set active user profile', () => {
    let userProfile = new UserProfile("User 5", 2, true)
    userAccount.addUserProfile(userProfile)
    userAccount.setActiveUserProfile(userProfile.id)
    expect(userAccount.activeUserProfile.name)
      .toEqual("User 5")
  });
})


// describe("CreateUserAccountPage", () => {
//   let component: CreateUserAccountPage;
//   let fixture: ComponentFixture<CreateUserAccountPage>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CreateUserAccountPage],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreateUserAccountPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
