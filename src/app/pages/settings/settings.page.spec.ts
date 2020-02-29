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


/*
 * Get code from language
 */
describe('Get code from language', () =>{
  it('Return the matching language-code, in this case de-DE', () => {
    expect(SettingsPage.getCodeFromLanguage('Deutsch'))
      .toEqual('de-DE')
  });
  it('Return the matching language-code, in this case en-EN', () => {
    expect(SettingsPage.getCodeFromLanguage('English'))
      .toEqual('en-US')
  });
  it('Return the matching language-code, in this case null', () => {
    expect(SettingsPage.getCodeFromLanguage('False input'))
      .toBeNull()
  });
})


/*
 * Get language from code
 */
describe('Get language from code', () =>{
  it('Return the matching language-name, in this case Deutsch', () => {
    expect(SettingsPage.getLanguageFromCode('de-DE'))
      .toEqual('Deutsch')
  });
  it('Return the matching language-name, in this case English', () => {
    expect(SettingsPage.getLanguageFromCode('en-US'))
      .toEqual('English')
  });
  it('Return the matching language-code, in this case null', () => {
    expect(SettingsPage.getCodeFromLanguage('False input'))
      .toBeNull()
  });
})


/*
 * Change language
 */
describe('Change language', () =>{
  let settingsPage

  beforeEach(() => {
    settingsPage =  new SettingsPage(navController, storage, router, settingsService, translateService, authService,
      toastService);
    settingsPage.settings.language = null
  });

  afterEach(() => {
    settingsPage = null
  });

  it('Changes the language to english', () => {
    settingsPage.changeLanguage('English')
    expect(settingsPage.settings.language)
      .toEqual('en-US')
  })
  it('Changes the language to german', () => {
    settingsPage.changeLanguage('Deutsch')
    expect(settingsPage.settings.language)
      .toEqual('de-DE')
  })
  it('Changes the language to unknown language', () => {
    settingsPage.changeLanguage('False input')
    expect(settingsPage.settings.language)
      .toBeNull()
  })
})


/*
 * Change TTS rate
 */
describe('Change TTS rate', () =>{
  let settingsPage

  beforeEach(() => {
    settingsPage =  new SettingsPage(navController, storage, router, settingsService, translateService, authService,
      toastService);
    settingsPage.settings.ttsRate = null;
  });

  afterEach(() => {
    settingsPage = null
  });

  it('Changes TTS rate to slow', () => {
    settingsPage.changeTtsRate(TTS_RATE_SLOW)
    expect(settingsPage.settings.ttsRate)
      .toEqual(TTS_RATE_SLOW_VALUE)
  })
  it('Changes TTS rate to normal', () => {
    settingsPage.changeTtsRate(TTS_RATE_NORMAL)
    expect(settingsPage.settings.ttsRate)
      .toEqual(TTS_RATE_NORMAL_VALUE)
  })
  it('Changes TTS rate to fast', () => {
    settingsPage.changeTtsRate(TTS_RATE_FAST)
    expect(settingsPage.settings.ttsRate)
      .toEqual(TTS_RATE_FAST_VALUE)
  })
  it('Changes TTS rate to unknown TTS', () => {
      settingsPage.changeTtsRate('False input')
      expect(settingsPage.settings.ttsRate)
        .toBeNull()
  })
})


/*
 * Change Font size
 */
describe('Change Font size', () =>{
  let settingsPage

  beforeEach(() => {
    settingsPage =  new SettingsPage(navController, storage, router, settingsService, translateService, authService,
      toastService);
    settingsPage.settings.fontSize = null;
  });

  afterEach(() => {
    settingsPage = null
  });

  it('Changes font size to 12', () => {
    settingsPage.changeFontSize(FONT_SIZE_12_LABEL)
    expect(settingsPage.settings.fontSize)
      .toEqual(FONT_SIZE_12_VALUE)
  })
  it('Changes font size to 14', () => {
    settingsPage.changeFontSize(FONT_SIZE_14_LABEL)
    expect(settingsPage.settings.fontSize)
      .toEqual(FONT_SIZE_14_VALUE)
  })
  it('Changes font size to 16', () => {
    settingsPage.changeFontSize(FONT_SIZE_16_LABEL)
    expect(settingsPage.settings.fontSize)
      .toEqual(FONT_SIZE_16_VALUE)
  })
  it('Changes font size to 18', () => {
    settingsPage.changeFontSize(FONT_SIZE_18_LABEL)
    expect(settingsPage.settings.fontSize)
      .toEqual(FONT_SIZE_18_VALUE)
  })
  it('Changes font size to unknown font size', () => {
    settingsPage.changeFontSize('False input')
    expect(settingsPage.settings.fontSize)
      .toBeNull()
  })
})
