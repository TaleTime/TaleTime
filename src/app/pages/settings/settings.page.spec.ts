import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SettingsPage} from "./settings.page";
import {StartPage} from "../start/start.page";
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {SettingsService} from "../../services/settings/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth/auth.service";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";

// describe("SettingsPage", () => {
//   let component: SettingsPage;
//   let fixture: ComponentFixture<SettingsPage>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [SettingsPage],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(SettingsPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });

class MockedNavController{

}

class MockedStorage{
  //TODO Store and get method's
}

class MockedRouter{
  navigate(){

  }

}

class MockedSettingsService{

}

class MockedTranslateService{
  use(lang){

  }
}

class MockedAuthService{
  //TODO Simulate user
}

class MockedToastService{

}

describe('Get code from language', () =>{
  it('Return the matching language-code, in this case de-DE', () => {
    expect(SettingsPage.getCodeFromLanguage('Deutsch'))
      .toEqual('de-DE');
  });
  it('Return the matching language-code, in this case en-EN', () => {
    expect(SettingsPage.getCodeFromLanguage('English'))
      .toEqual('en-US');
  });
})


describe('Get language from code', () =>{
  it('Return the matching language-name, in this case Deutsch', () => {
    expect(SettingsPage.getLanguageFromCode('de-DE'))
      .toEqual('Deutsch');
  });
  it('Return the matching language-name, in this case English', () => {
    expect(SettingsPage.getLanguageFromCode('en-US'))
      .toEqual('English');
  });
})

TestBed.configureTestingModule({
  declarations: [

  ],
  providers: [
    {provide: NavController, useClass: MockedNavController},
    {provide: Storage, useClass: MockedStorage},
    {provide: Router, useClass: MockedRouter},
    {provide: SettingsService, useClass: MockedSettingsService},
    {provide: TranslateService, useClass: MockedTranslateService},
    {provide: AuthService, useClass: MockedAuthService},
    {provide: SimpleToastService, useClass: MockedToastService}
  ]
});

let navController = TestBed.get(NavController);
let storage = TestBed.get(Storage);
let router = TestBed.get(Router);
let settingsService = TestBed.get(SettingsService);
let translateService = TestBed.get(TranslateService);
let authService = TestBed.get(AuthService);
let toastService = TestBed.get(SimpleToastService);

let settingsPage =  new SettingsPage(navController, storage, router, settingsService, translateService, authService, toastService);

describe('Change language', () =>{
  beforeEach(() => {
    settingsPage.changeLanguage('English')
  });

  it('Changes the language to english', () => {
    expect(settingsPage.settings.language)
      .toEqual('en-US')
  })
})

describe('Change language', () =>{
  beforeEach(() => {
    settingsPage.changeLanguage('Deutsch')
  });

  it('Changes the language to german', () => {
    expect(settingsPage.settings.language)
      .toEqual('de-DE')
  })
})


describe('Change language to unknown language', () =>{
  beforeEach(() => {
    settingsPage.changeLanguage('False input')
  });

  it('Changes the language to unknown language', () => {
    expect(settingsPage.settings.language)
      .toEqual(null)
  })
})
