import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { AlertController } from "ionic-angular";


import { StoryInformation } from "../../datamodels/storyInformation";
import { StoryService } from "../../providers/story/story";

import { PlayerPage } from "../player/player";
import { STORY_DIR } from "../../app/constants";
import { SaveGameService } from "../../providers/savegame/savegame";
import { PublicStoryHelperService } from "../../providers/public-story-helper/public-story-helper";
import deleteProperty = Reflect.deleteProperty;

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
export class StoryDetailsPage{
  selectedStory: StoryInformation;
  selectedReader: string;
  imgPath: string = "dummy.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storyService: StoryService,
    private savegameService: SaveGameService,
    private publicStoryHelper: PublicStoryHelperService,
    private toastCtrl: ToastController,
    private alertctrl: AlertController,
  ) {
    this.selectedStory = this.navParams.get("selectedStory");
    console.log("Show Details: " + JSON.stringify(this.selectedStory));

    if (this.selectedStory.medium === "cloud") {
      this.imgPath = this.publicStoryHelper.getThumbnailPathForStory(
        this.selectedStory
      );
    } else {
      this.imgPath = STORY_DIR + this.selectedStory.id + "/icon.png";
    }
    console.log("ImgPath:", this.imgPath);
    this.selectedReader = this.savegameService.loadSavegame(
      this.selectedStory.id
    ).reader;
  }

  //Muss noch implementiert werden
  saveReader() {
    let sg = this.savegameService.loadSavegame(this.selectedStory.id);
    sg.reader = this.selectedReader;
    this.savegameService.updateSavegame(sg);
  }

  deleteStory(id: string) {
    let alert = this.alertctrl.create({
      title:"Löschen?",
      message: "Möchten Sie die Geschichte löschen?",
      buttons: [{
        text: "Abbrechen",
        role: "abbrechen",
        handler: () => {
          console.log("abgebrochen");
        }
      }, {
        text: "Löschen",
        handler: () => {
          //Ask if he wants to delete?!
          this.storyService.deleteStory(id);
          this.navCtrl.pop().then(() =>{
            let toast = this.toastCtrl.create({
              message: "Geschichte wurde gelöscht",
              duration: 3000,
              position: "buttom"
            })
            toast.present();
          })
        }
      }]
    });
    alert.present();
    //console.log("delete: " + id);

    //this.storyService.deleteStory(id);
    //Muss noch implementiert werden

    //deleteSaveGame();
    //this.navCtrl.pop();
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
