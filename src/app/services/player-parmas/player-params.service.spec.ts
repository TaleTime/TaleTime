import { TestBed } from '@angular/core/testing';

import { PlayerParamsService } from './player-params.service';
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
import {LanguageService} from "../language/language.service";
import {PlayerParams} from "../../models/player/player-params";

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

describe('Set player parameters', () =>{
  let playerParams
  let playerParamsService

  beforeEach(() => {
    renewTestbed()
    playerParams = new PlayerParams()
    playerParamsService = new PlayerParamsService(playerParams)
  });

  afterEach(() => {
    playerParams = null;
    playerParamsService = null
  });
  it('Player params.mode is continue and params.storyId is sheep', () => {
    playerParams.mode = "continue"
    playerParams.storyId = "sheep"
    playerParamsService.setPlayerParams(playerParams)
    expect(playerParamsService.playerParams.mode)
      .toEqual("continue")
    expect(playerParamsService.playerParams.storyId)
      .toEqual("sheep")
  })
  it('Player params.mode is restart and params.storyId is sheep', () => {
    playerParams.mode = "restart"
    playerParams.storyId = "sheep"
    playerParamsService.setPlayerParams(playerParams)
    expect(playerParamsService.playerParams.mode)
      .toEqual("restart")
    expect(playerParamsService.playerParams.storyId)
      .toEqual("sheep")
  })
  it('Player params.mode is continue and params.storyId is ball', () => {
    playerParams.mode = "continue"
    playerParams.storyId = "ball"
    playerParamsService.setPlayerParams(playerParams)
    expect(playerParamsService.playerParams.mode)
      .toEqual("continue")
    expect(playerParamsService.playerParams.storyId)
      .toEqual("ball")
  })
  it('Player params.mode is restart and params.storyId is ball', () => {
    playerParams.mode = "restart"
    playerParams.storyId = "ball"
    playerParamsService.setPlayerParams(playerParams)
    expect(playerParamsService.playerParams.mode)
      .toEqual("restart")
    expect(playerParamsService.playerParams.storyId)
      .toEqual("ball")
  })
})

// describe('PlayerParamsService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));
//
//   it('should be created', () => {
//     const service: PlayerParamsService = TestBed.get(PlayerParamsService);
//     expect(service).toBeTruthy();
//   });
// });
