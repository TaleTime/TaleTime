import { Injectable } from "@angular/core";
import { SaveGame } from "../../models/saveGame";
import { AuthService } from "../auth/auth.service";
import { ProfileService } from "../profile/profile.service";
import { FireBaseService} from "../firebase/firebaseService";
import { map } from "rxjs/operators";
import { FB_PATH_SAVEGAME, FB_PATH_USERS } from "src/app/constants/constants";

@Injectable({
  providedIn: "root",
})
export class SaveGameService {
  private readonly SAVEGAME_KEY = "SAVEGAMES";
  // Stores a Map, that maps profile ids to a story-id/savegame map
  private savegames: Map<string, Map<string, SaveGame>> = new Map();
  private profileSaveGames: Map<string, SaveGame> = new Map();
  pathToUserProfile: string = FB_PATH_USERS + this.authService.currentUserAccount.uid +"/" +this.profileService.getActiveUserProfile().id + "/"
  pathToUserProfileSaveGame: string = FB_PATH_USERS + this.authService.currentUserAccount.uid +"/" +this.profileService.getActiveUserProfile().id + "/" + FB_PATH_SAVEGAME

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private firebaseService: FireBaseService
  ) {
    this.loadSavegames();
  }

  public loadSavegames() {
    this.firebaseService
      .getAllItems(
        this.pathToUserProfileSaveGame
      )
      .pipe(
        map((action) =>
          action.map((a) => {
            
            let payload = a.payload.child("/").val();
            let saveGame = new SaveGame();
            let saveGameMap: Map<string, SaveGame> = new Map();
            saveGame.chosenPath = payload.chosenPath;
            saveGame.reader = payload.reader;
            saveGame.storyId = payload.storyId;
            this.profileSaveGames.set(saveGame.storyId, saveGame);
            
          })
        )
      )
      .subscribe();
  }

  public loadSavegame(storyId: string): SaveGame {
    const emptySave = new SaveGame();
    emptySave.storyId = storyId;
    emptySave.chosenPath = new Array<number>();

    return this.profileSaveGames.has(storyId)
      ? this.profileSaveGames.get(storyId)
      : emptySave;
  }

  public addSavegame(savegame: SaveGame) {
    
    this.firebaseService.setItem(
      this.pathToUserProfileSaveGame,
      savegame.storyId,
      savegame
    );
  }

  private getProfileSaves(): Map<string, SaveGame> {
    const profileId = this.profileService.getActiveUserProfile().id;

    let profileSaves = this.savegames.get(profileId);
    if (profileSaves == null) {
      profileSaves = new Map<string, SaveGame>();
      this.savegames.set(profileId, profileSaves);
    }
    return profileSaves;
  }


  public updateSavegame(savegame: SaveGame) {
    
    this.firebaseService.setItem(
      this.pathToUserProfileSaveGame,
      savegame.storyId,
      savegame
    );
  }
}
