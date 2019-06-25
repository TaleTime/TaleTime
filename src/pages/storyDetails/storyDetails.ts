import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { StoryInformation } from "../../datamodels/storyInformation";
import { StoryProvider } from "../../providers/story/story";

import { PlayerPage } from "../player/player";
import { STORY_DIR } from "../../app/constants";
import { SaveGameProvider } from "../../providers/savegame/savegame";
import { PublicStoryHelperProvider } from "../../providers/public-story-helper/public-story-helper";

/**
 * Generated class for the StoryDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-storyDetails",
  templateUrl: "storyDetails.html"
})
export class StoryDetailsPage {
  selectedStory: StoryInformation;
  selectedReader: string;
  imgPath: string = "dummy.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storyProvider: StoryProvider,
    private savegameProvider: SaveGameProvider,
    private publicStoryHelper: PublicStoryHelperProvider
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
    this.selectedReader = this.savegameProvider.loadSavegame(
      this.selectedStory.id
    ).reader;
  }

  //Muss noch implementiert werden
  saveReader() {
    let sg = this.savegameProvider.loadSavegame(this.selectedStory.id);
    sg.reader = this.selectedReader;
    this.savegameProvider.updateSavegame(sg);
  }

  deleteStory(id: string) {
    this.storyProvider.deleteStory(id);
    //Muss noch implementiert werden
    //deleteSaveGame();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad StoryDetailsPage");
  }

  goToPlayerPageNew(storyId: string) {
    console.log("StoryId: " + storyId);
    this.navCtrl.push(PlayerPage, {
      storyId: storyId,
      mode: "begin"
    });
  }

  goToPlayerPageContinue(storyId: string) {
    console.log("StoryId: " + storyId);
    this.navCtrl.push(PlayerPage, {
      storyId: storyId,
      mode: "continue"
    });
  }
}
