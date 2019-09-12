import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "@ionic/angular";

import {StoryInformation} from "../../models/storyInformation";
import {StoryService} from "../../services/story/story.service";

import {STORY_DIR} from "../../constants/constants";
import {SaveGameService} from "../../services/save-game/save-game.service";
import {PublicStoryHelperService} from "../../services/public-story-helper/public-story-helper.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-story-details",
  templateUrl: "./story-details.page.html",
  styleUrls: ["./story-details.page.scss"],
})
export class StoryDetailsPage implements OnInit {

  selectedStory: StoryInformation;
  selectedReader: string;
  imgPath = "dummy.png";

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public navParams: NavParams,
    public storyService: StoryService,
    private saveGameService: SaveGameService,
    private publicStoryHelper: PublicStoryHelperService
  ) {
    this.selectedStory = navParams.get("selectedStory");
    console.log("Show Details: " + JSON.stringify(this.selectedStory));

    if (this.selectedStory.medium === "cloud") {
      this.imgPath = this.publicStoryHelper.getThumbnailPathForStory(
        this.selectedStory
      );
    } else {
      this.imgPath = STORY_DIR + this.selectedStory.id + "/icon.png";
    }
    console.log("ImgPath:", this.imgPath);
    this.selectedReader = this.saveGameService.loadSavegame(
      this.selectedStory.id
    ).reader;
  }

  // TODO Muss noch implementiert werden
  saveReader() {
    const sg = this.saveGameService.loadSavegame(this.selectedStory.id);
    sg.reader = this.selectedReader;
    this.saveGameService.updateSavegame(sg);
  }

  deleteStory(id: string) {
    this.storyService.deleteStory(id);
    // TODO Muss noch implementiert werden
    // deleteSaveGame();
    this.navCtrl.pop();
  }

  goToPlayerPageNew(storyId: string) {
    console.log("StoryId: " + storyId);
    this.router.navigate(["/player", {storyId, mode: "begin"}]);
  }

  goToPlayerPageContinue(storyId: string) {
    console.log("StoryId: " + storyId);
    this.router.navigate(["/player", {storyId, mode: "continue"}]);

  }

  ngOnInit() {
    console.log("ngOnInit StoryDetailsPage");
  }

}
