import {ApplicationRef, Component, NgZone, OnInit} from "@angular/core";
import {StoryInformation, StoryInformationWithUrl} from "../../../models/storyInformation";
import {StoryService} from "../../../services/story/story.service";
import {StoryInformationService} from "../../../services/story-information/story-information.service";
import {LanguageService} from "../../../services/language/language.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ProfileService} from "../../../services/profile/profile.service";
import {FireBaseService} from "../../../services/firebase/firebaseService";
import {ReviewServiceService} from "src/app/services/review-service.service";
import {Review} from "../../../models/review";

@Component({
  selector: "app-description",
  templateUrl: "./description.component.html",
  styleUrls: ["./description.component.scss"],
})
export class DescriptionComponent implements OnInit {
  storyTitle: string;
  downloadCounter: number;
  storyAuthor: string[];
  storyCategory: string[];
  shortDescription: string;
  coverUrl: string;
  public currentStoryID: string;
  public currentStoryTitle: string;
  public story: StoryInformation;
  public readonly PUBLIC_STORY_URL: string =
    "https://raw.githubusercontent.com/TaleTime/TaleTime/feature_firebase-cloud-stories/index.json";

  public availableReview: Array<Review> = [];
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    public storyService: StoryService,
    private reviewService: ReviewServiceService,
    private profileService: ProfileService,
    private languageService: LanguageService,
    private firebaseService: FireBaseService,
    private storyInformationService: StoryInformationService
  ) { }

  ngOnInit() {
    this.reviewService.currentStoryId.subscribe(currentStoryId => this.currentStoryID = currentStoryId);
    this.reviewService.currentStoryTitle.subscribe(currentStoryTitle => this.currentStoryTitle = currentStoryTitle);
    if (typeof this.currentStoryID === "undefined"){this.currentStoryID = "0"; }
    this.loadStoryFromFirebase(this.currentStoryID);
  }


  /**
   * loads the current description story from Firebase
   * @author Alexander Stolz
   * @param storyID firebases story-id (../stories/<id>)
   */
  loadStoryFromFirebase(storyID: string) {
    this.firebaseService.getItemById("stories/" + storyID).subscribe((data) => {
      this.story = data.payload.val();
      this.storyTitle = this.story.title;
      this.downloadCounter = this.story.downloadCounter;
      this.shortDescription = this.story.shortDescription;
      this.storyAuthor = this.story.author;
      this.coverUrl = this.story.coverUrl;
      this.storyCategory = this.story.category;
    }, (err) => {
      console.log("Error :", err);
    });
  }





  /**
   * Increases property 'downloadCoutner' of stories, if a new cloud version has been downloaded
   * @param story transmitted story to create upl URL for changing the value inside the Firebase realtime database
   * Access to function setitem() of the firebase service
   * Seperated into three variables: key, data and dbNode
   * @author Alexander Stolz
   */
  increaseCounter(story: StoryInformation | StoryInformationWithUrl){
    this.firebaseService.setItem(
      "stories/" +
      story.elementId +
      "/",
      "downloadCounter",
      (story.downloadCounter + 1)
    );


  }

}
