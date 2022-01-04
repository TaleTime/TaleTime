import {ApplicationRef, Component, NgZone, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ReviewServiceService} from "src/app/services/review-service.service";
import {FireBaseService} from "src/app/services/firebase/firebaseService";
import {UserProfile} from "../../models/userProfile";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth/auth.service";
import {LanguageService} from "../../services/language/language.service";
import {ProfileService} from "../../services/profile/profile.service";
import {FB_PATH_USERS, } from "../../constants/constants";
import {Review} from "../../models/review";
import {map} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";


@Component({
  selector: "app-story-review",
  templateUrl: "./story-review.component.html",
  styleUrls: ["./story-review.component.scss"],
})
export class StoryReviewComponent implements OnInit {
  public isLoaded = true;
  public currentStoryID: string;
  public currentStoryTitle: string;
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;
  public activeUserProfile: UserProfile;
  selectedRating: string;
  rating = [
    {name: "1", value: 1},
    {name: "2", value: 2},
    {name: "3", value: 3},
    {name: "4", value: 4},
    {name: "5", value: 5}
  ];
  subscription: Subscription;

  public availableReview: Array<Review> = [];

  // private pathToCurrentUser = FB_PATH_USERS + this.authService.currentUserAccount.uid + "/";

  public userId: string = this.authService.currentUserAccount.uid;

  constructor(
    private app: ApplicationRef,
    private zone: NgZone,
    private firebaseService: FireBaseService,
    private reviewService: ReviewServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService,
    private profileService: ProfileService,
    public formBuilder: FormBuilder
  ) {

  }


  ngOnInit(): void {
    this.reviewService.currentStoryId.subscribe(currentStoryId => this.currentStoryID = currentStoryId);
    if (typeof this.currentStoryID === "undefined"){this.currentStoryID = "0"; }
    this.reviewService.currentStoryTitle.subscribe(currentStoryTitle => this.currentStoryTitle = currentStoryTitle);
    this.loadFirebaseStorieReview();



    this.activeUserProfile = this.profileService.getActiveUserProfile();
    if (this.activeUserProfile) {
      this.activeUserProfileName = this.activeUserProfile.name;
      this.activeUserProfileAvatarName = this.activeUserProfile.avatar.name;
    }
  }


  /**
   * Loads the review stored under /reviews/ in the FireBase RealtimeDB
   * @author Alexander Stolz
   */

  loadFirebaseStorieReview() {
  this.availableReview =  [] as Review[];
    console.log("__debug: "+this.availableReview.length);
    this.firebaseService.getAllItems("ratings/" + this.currentStoryID).pipe(map((action) => action.filter((a) => {

      const payload = a.payload.val();
      this.availableReview.push(payload);
    }))).subscribe();
    console.log(this.availableReview);

  }

  /**
   * Router to page 'select-user-profile'
   * @author Alexander Stolz
   */
  goToSelectUserProfile() {
    void this.router.navigate(["/select-user-profile"]);
  }


  /**
   * Router to page 'select-user-profile'
   * @author Alexander Stolz
   */
  goToAvailableStories() {
    void this.router.navigate(["/available-stories"]);
  }

  /**
   * @author Alexander Stolz
   * Add new review for story
   */
  addNewReview(reviewText: string) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();

    const newStoryReview: Review = {
      author: this.activeUserProfileName,
      authorId: this.userId,
      comment: reviewText,
      date: mm + "/" + dd + "/" + yyyy,
      rating: this.selectedRating,
      ratingId: "0"
    };

    const key = this.firebaseService.addNewItem("ratings/" + this.currentStoryID, newStoryReview);


    newStoryReview.ratingId = key;

    this.firebaseService.setItem(
      "ratings/" + this.currentStoryID + "/" + key + "/",
      "ratingId",
      key
    );
    this.reload();
  }

  /**
   * @author Alexander Stolz
   * Reload the current page to fetch current data
   */
  reload() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl("/", {
      skipLocationChange: true
    }).then(() => {
      void this.router.navigate([currentUrl]);
    });
  }


  /**
   * Delete specific story
   * @author Alexander Stolz
   * @param storyId Given story id
   */
  deleteReview(storyId: any) {
    this.firebaseService.deleteItem("ratings/" +
      this.currentStoryID +
      "/" + storyId);
    this.reload();

  }

  /**
   * Navigates back to the home-screen.
   */
  goBackToHomeScreen() {
    void this.router.navigate(["/tabs/available-stories"]);
  }

  identify(index, item){
    return item.id;
  }



}
