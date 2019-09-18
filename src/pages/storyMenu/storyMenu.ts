import { Component } from "@angular/core";
import { MenuController, NavController, Platform } from "ionic-angular";
import { Reader, StoryInformation } from "../../datamodels/storyInformation";
import { SelectUserProfilePage } from "../selectUserProfile/selectUserProfile";
import { AuthService } from "../../providers/auth/auth";
import { StoryDetailsPage } from "../storyDetails/storyDetails";
import { StoryService } from "../../providers/story/story";
import { PlayerPage } from "../player/player";
import { App } from "ionic-angular/components/app/app";

@Component({
  selector: "page-storyMenu",
  templateUrl: "storyMenu.html"
})
export class StoryMenuPage {
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;

  constructor(
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    public storyService: StoryService
  ) {
    const activeUserProfile = this.authService.getActiveUserProfile();
    if (activeUserProfile) {
      this.activeUserProfileName = activeUserProfile.name;
      this.activeUserProfileAvatarName = activeUserProfile.avatar.name;
    }
  }

  public get stories(): Array<StoryInformation> {
    return this.storyService.stories;
  }

  goToSelectUserProfilePage() {
    this.navCtrl.push(SelectUserProfilePage);
  }

  showDetails(story: StoryInformation) {
    this.navCtrl.push(StoryDetailsPage, {
      selectedStory: story
    });
  }

  deleteStory(story: StoryInformation) {
    this.storyService.deleteStory(story.id);
  }

  goToPlayerPage(storyId: string) {
    this.navCtrl.push(PlayerPage, {
      storyId: storyId,
      mode: "continue"
    });
  }

  goToAvailableStories() {
    this.navCtrl.parent.select(1);
  }

  getSubtitle(r: Reader) {
    return " " + r.name;
  }
}
