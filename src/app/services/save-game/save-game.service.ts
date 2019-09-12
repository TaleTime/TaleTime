import {Injectable} from "@angular/core";
import {SaveGame} from "../../models/saveGame";
import {Storage} from "@ionic/storage";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class SaveGameService {

  private readonly SAVEGAME_KEY = "SAVEGAMES";
  // Stores a Map, that maps profile ids to a story-id/savegame map
  private savegames: Map<string, Map<string, SaveGame>> = new Map();

  constructor(private storage: Storage, private authService: AuthService) {
    this.storage
      .ready()
      .then((storage) => {
        this.loadSavegames();
      })
      .catch((error) => {
        console.error("Could not load savegames at all!");
      });
  }

  private loadSavegames() {
    return this.storage.get(this.SAVEGAME_KEY).then((savegames) => {
      if (savegames != null) {
        this.savegames = savegames;
      }
    });
  }

  public loadSavegame(storyId: string): SaveGame {
    const emptySave = new SaveGame();
    emptySave.storyId = storyId;
    emptySave.chosenPath = new Array<number>();
    const userSaves = this.savegames.get(
      this.authService.getActiveUserProfile().id
    );
    if (userSaves == null) {
      return emptySave;
    } else {
      const savegame = userSaves.get(storyId);
      // If no savegame for story found --> return an empty savegame
      return savegame || emptySave;
    }
  }

  public addSavegame(savegame: SaveGame) {
    const profileSaves = this.getProfileSaves();
    profileSaves.set(savegame.storyId, savegame);
    this.save();
  }

  private getProfileSaves(): Map<string, SaveGame> {
    const profileId = this.authService.getActiveUserProfile().id;
    let profileSaves = this.savegames.get(profileId);
    if (profileSaves == null) {
      profileSaves = new Map<string, SaveGame>();
      this.savegames.set(profileId, profileSaves);
    }
    return profileSaves;
  }

  private save() {
    this.storage.set(this.SAVEGAME_KEY, this.savegames).then(
      (value) => {
        console.log("SaveGameService: Saved savegames!");
      },
      (reason) => {
        console.error(
          "SaveGameService: Could not save savegames. Error: " +
          JSON.stringify(reason)
        );
      }
    );
  }

  public updateSavegame(savegame: SaveGame) {
    const profileSaves = this.getProfileSaves();
    profileSaves.set(savegame.storyId, savegame);
    this.save();
  }
}
