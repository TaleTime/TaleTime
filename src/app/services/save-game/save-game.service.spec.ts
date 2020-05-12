import {TestBed} from "@angular/core/testing";

import {SaveGameService} from "./save-game.service";
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
import {SaveGame} from "../../models/saveGame";
import {UserProfile} from "../../models/userProfile";

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

describe('Test add and load savegame', () =>{
  let saveGameService

  beforeEach(() => {
    renewTestbed()
    saveGameService = new SaveGameService(storage, authService)
  });

  afterEach(() => {
    saveGameService = null
  });
  it('Test add and load savegame 1', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [4, 7, 8, 12]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 2', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [78, 3, 2, 56]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 3', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [8, ,13, 12, 4]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 4', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [9, 34, 23 ,5, 53, 3, 2, 1, 3, 55, 23]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 5', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [109, 43, 232, 3212, 1212, 656, 767, 21]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 6', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [9, 213, 23, 54, 32, 12, 55, 67, 3]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
  it('Test add and load savegame 7', () => {
    let saveGame = new SaveGame()
    let storyId = "story 1"
    let chosenPath = [4 , 0, 9, 9, 423, 34, 2, 22]
    let userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(chosenPath)
  })
})

describe('Update savegame', () =>{
  let saveGameService
  let saveGame
  let storyId
  let chosenPath
  let userProfile

  beforeEach(() => {
    renewTestbed()
    saveGameService = new SaveGameService(storage, authService)
    saveGame = new SaveGame()
    storyId = "story 1"
    chosenPath = [4, 7, 8, 12]
    userProfile = new UserProfile("Test profile", 2, false);

    authService.activeUserProfile = userProfile
    saveGame.storyId = storyId
    saveGame.chosenPath = chosenPath
    saveGameService.addSavegame(saveGame)
  });

  afterEach(() => {
    saveGameService = null
    saveGame = null
    storyId = null
    chosenPath = null
    userProfile = null
  });
  it('Test update savegame 1', () => {
    let newChosenPath = [4, 7, 8, 12, 11]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
  it('Test update savegame 2', () => {
    let newChosenPath = [7, 534, 23, 234, 324, 23]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
  it('Test update savegame 3', () => {
    let newChosenPath = [23, 23, 324, 64, 2]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
  it('Test update savegame 4', () => {
    let newChosenPath = [342, 54, 67, 223, 545, 23, 4]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
  it('Test update savegame 5', () => {
    let newChosenPath = [223, 32, 534, 2, 54, 32, 23]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
  it('Test update savegame 6', () => {
    let newChosenPath = [777, 12321, 123, 4, 242, 5433, 345]
    saveGame.chosenPath = newChosenPath
    saveGameService.updateSavegame(saveGame)
    expect(saveGameService.loadSavegame(storyId).chosenPath)
      .toEqual(newChosenPath)
  })
})


// describe("SaveGameService", () => {
//   beforeEach(() => TestBed.configureTestingModule({}));
//
//   it("should be created", () => {
//     const service: SaveGameService = TestBed.get(SaveGameService);
//     expect(service).toBeTruthy();
//   });
// });
