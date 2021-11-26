import {Component} from "@angular/core";
import {NavController} from "@ionic/angular";

import {StoryInformation} from "../../models/storyInformation";
import {StoryService} from "../../services/story/story.service";

import {STORY_DIR} from "../../constants/constants";
import {SaveGameService} from "../../services/save-game/save-game.service";
import {PublicStoryHelperService} from "../../services/public-story-helper/public-story-helper.service";
import {Router, Routes} from "@angular/router";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {StoryMenuPage} from "../story-menu/story-menu.page";
import {PlayerParams} from "../../models/player/player-params";
import {PlayerParamsService} from "../../services/player-parmas/player-params.service";

const routes: Routes = [{path: "storyMenu", component: StoryMenuPage}];

@Component({
  selector: "app-story-details",
  templateUrl: "./story-details.page.html",
  styleUrls: ["./story-details.page.scss"],
})
export class StoryDetailsPage {
  selectedStory: StoryInformation;
  imgPath = "dummy.png";

  public selectedReader: string;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public storyInformationService: StoryInformationService,
    public storyService: StoryService,
    public playerParamsService: PlayerParamsService,
    private saveGameService: SaveGameService,
    private publicStoryHelper: PublicStoryHelperService,
  ) {
    this.selectedStory = this.storyInformationService.storyInformation;
    console.log("Show Details: " + JSON.stringify(this.selectedStory));

    if (this.selectedStory.medium === "cloud") {
      this.imgPath = this.publicStoryHelper.getThumbnailPathForStory(
        this.selectedStory
      );
    } else {
      this.imgPath = STORY_DIR + this.selectedStory.id + "/icon.png";
    }
    this.selectedReader = this.saveGameService.loadSavegame(
      this.selectedStory.id
    ).reader;
  }

  ngOnInit() {
    this.imgPath = STORY_DIR + this.selectedStory.id + "/icon.png";
    this.selectedStory.cover = this.imgPath;
  }

  saveReader() {
    const sg = this.saveGameService.loadSavegame(this.selectedStory.id);
    sg.reader = this.selectedReader;
    this.saveGameService.updateSavegame(sg);
  }

  deleteStory(id: string) {
    this.storyService.deleteStory(id);
    this.navCtrl.pop();
  }

  goToPlayerPageNew(storyId: string) {
    const playerParams = new PlayerParams();
    playerParams.storyId = storyId;
    playerParams.mode = "begin";
    playerParams.reader = this.selectedReader;
    this.playerParamsService.setPlayerParams(playerParams);
    this.router.navigate(["/player"]);
  }

  goToPlayerPageContinue(storyId: string) {
    console.log("StoryId: " + storyId);
    const playerParams = new PlayerParams();
    playerParams.storyId = storyId;
    playerParams.mode = "continue";
    playerParams.reader = this.selectedReader;
    this.playerParamsService.setPlayerParams(playerParams);
    this.router.navigate(["/player"]);
  }

  goBackToHomeScreen() {
    this.router.navigate(["/tabs/story-menu"]);
  }

  goToEditScreen() {
    this.router.navigate(["/story-edit"]);
  }
}
