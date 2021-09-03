import { Injectable } from "@angular/core";
import { SaveGame } from "../../models/saveGame";
import { Storage } from "@ionic/storage";
import { AuthService } from "../auth/auth.service";
import { ProfileService } from "../profile/profile.service";
import { FireBaseService } from "../firebase/firebaseService";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SaveGameService {
  private readonly SAVEGAME_KEY = "SAVEGAMES";
  // Stores a Map, that maps profile ids to a story-id/savegame map
  private savegames: Map<string, Map<string, SaveGame>> = new Map();
  private profileSaveGames: Map<string, SaveGame> = new Map();
  constructor(
    private storage: Storage,
    private authService: AuthService,
    private profileService: ProfileService,
    private firebaseService: FireBaseService
  ) {
    this.loadSavegames();
  }

  public loadSavegames() {
    this.firebaseService
      .getAllItems(
        "users/" +
          this.authService.currentUserAccount.uid +
          "/" +
          this.profileService.getActiveUserProfile().id +
          "/saveGame"
      )
      .pipe(
        map((action) =>
          action.map((a) => {
            //let profile = a.payload.child("/").val();
            let payload = a.payload.child("/").val();
            let saveGame = new SaveGame();
            let saveGameMap: Map<string, SaveGame> = new Map();
            saveGame.chosenPath = payload.chosenPath;
            saveGame.reader = payload.reader;
            saveGame.storyId = payload.storyId;
            this.profileSaveGames.set(saveGame.storyId, saveGame);
            //this.profileSaveGames.set(saveGame.storyId, saveGame);
          })
        )
      )
      .subscribe();
    // return this.storage.get(this.SAVEGAME_KEY).then((savegames) => {
    //   if (savegames != null) {
    //     this.savegames = savegames;
    //   }
    // });
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
    console.log("Add");
    this.firebaseService.setItem(
      "users/" +
        this.authService.currentUserAccount.uid +
        "/" +
        this.profileService.getActiveUserProfile().id,
      "/saveGame/" + savegame.storyId,
      savegame
    );

    //profileSaves = Map<storyId, SaveGame>

    // const profileSaves = this.getProfileSaves();
    // profileSaves.set(savegame.storyId, savegame);
    // this.save();
  }

  private getProfileSaves(): Map<string, SaveGame> {
    const profileId = this.profileService.getActiveUserProfile().id;

    //savegames = Map<profileId, ProfileSaves>

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
    console.log("UPDÄÄTE");
    this.firebaseService.setItem(
      "users/" +
        this.authService.currentUserAccount.uid +
        "/" +
        this.profileService.getActiveUserProfile().id,
      "/saveGame/" + savegame.storyId,
      savegame
    );

    // const profileSaves = this.getProfileSaves();
    // profileSaves.set(savegame.storyId, savegame);
    // this.save();
  }
}
