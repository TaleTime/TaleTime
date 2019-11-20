import {Component, OnInit} from "@angular/core";
import {MenuController, NavController, Platform} from "@ionic/angular";
import {Reader, StoryInformation} from "../../models/storyInformation";
import {AuthService} from "../../services/auth/auth.service";
import {StoryService} from "../../services/story/story.service";
import {Router} from "@angular/router";
import {PlayerParamsService} from "../../services/player-parmas/player-params.service";
import {PlayerParams} from "../../models/player/player-params";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {Storage} from "@ionic/storage";
import {AlertController} from "@ionic/angular";
import {SimpleToastService} from "../../services/simple-toast/simple-toast.service";

@Component({
  selector: "app-story-menu",
  templateUrl: "./story-menu.page.html",
  styleUrls: ["./story-menu.page.scss"],
})
export class StoryMenuPage implements OnInit {

  activeUserProfileName: string;
  activeUserProfileAvatarName: string;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastService: SimpleToastService,
    public platform: Platform,
    // public app: App,
    public router: Router,
    public playerParamsService: PlayerParamsService,
    public storyInformationService: StoryInformationService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    public storyService: StoryService
  ) {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }
    const activeUserProfile = this.authService.getActiveUserProfile();
    console.log("STORY_MENU_CURRENT_USER: ", this.authService.currentUserAccount);
    if (activeUserProfile) {
      this.activeUserProfileName = activeUserProfile.name;
      this.activeUserProfileAvatarName = activeUserProfile.avatar.name;
    }
  }

  public get stories(): Array<StoryInformation> {
    return this.storyService.stories;
  }

  goToSelectUserProfilePage() {
    this.navCtrl.navigateForward("/select-user-profile");
  }

  showDetails(story: StoryInformation) {
    this.storyInformationService.storyInformation = story;
    this.router.navigate(["/story-details"]);
  }

  deleteStory(story: StoryInformation) {
    this.storyService.deleteStory(story.id);
  }

  async goToPlayerPage(storyId: string) {
    let playerParams = new PlayerParams();
    playerParams.storyId = storyId;

    const alert = await this.showResumeOrRestartDialog((valid) => {
      if (valid === "begin") {
        debugger;
        playerParams.mode = "begin"; //TODO i18n
        this.playerParamsService.setPlayerParams(playerParams);
        this.router.navigate(["/player"]);
      } else {
        debugger;
        playerParams.mode = "continue";
        this.playerParamsService.setPlayerParams(playerParams);
        this.router.navigate(["/player"]);
      }
    });

    await alert.present();
  }

  public showResumeOrRestartDialog(modeFn: (arg) => void, cancelFn?: (arg) => void){
    return this.alertCtrl.create({
      header: "Resume or Restart", // TODO i18n
      inputs: [

      ],
      buttons: [
        {
          text: "Resume",
          role: "resume",
          handler: (data) => {
            modeFn("continue");
          }
        },
        {
          text: "Restart",
          role: "restart",
          handler: (data) => {
            modeFn("begin");
          }
        },
        {
          text: "Cancel", // TODO i18n
          role: "cancel",
          handler: (data) => {
            if (cancelFn) {
              cancelFn(data);
            } else {
              console.log("Cancel clicked"); //TODO i18n
            }
          }
        },
        // {
        //   text: "Ok", // TODO i18
        //   handler: (data) => {
        //     this.authService.changePin(data.oldPin, data.newPin, data.newPinRe).subscribe(result => {
        //       validFn(result.success);
        //     });
        //   }
        // }
      ]
    });
  }

  goToAvailableStories() {
    this.router.navigate(["/tabs/available-stories"]);
  }

  getSubtitle(r: Reader) {
    return " " + r.name;
  }

  ngOnInit() {
  }

}
