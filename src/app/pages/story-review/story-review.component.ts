import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HTTP} from "@ionic-native/http/ngx";
import { ReviewServiceService } from "src/app/services/review-service.service";
import {FireBaseService} from "src/app/services/firebase/firebaseService";
import {UserProfile} from "../../models/userProfile";
import {TranslateService} from "@ngx-translate/core";
import {AlertService} from "../../services/alert/alert.service";
import {AuthService} from "../../services/auth/auth.service";
import {LanguageService} from "../../services/language/language.service";
import {ProfileService} from "../../services/profile/profile.service";
import {CLOUD,FB_PATH_STORIES,FB_PATH_USERS, } from "../../constants/constants";
import {Review} from "../../models/review"
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './story-review.component.html',
  styleUrls: ['./story-review.component.scss'],
})
export class StoryReviewComponent implements OnInit {
  public storyID:string;
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;
  private activeUserProfile: UserProfile;

  public availableReview: Review;

  private pathToCurrentUser =
  FB_PATH_USERS + this.authService.currentUserAccount.uid + "/";


  constructor(
    private firebaseService: FireBaseService,
    private reviewService: ReviewServiceService,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService,
    private profileService: ProfileService,) { 
  }

  ngOnInit():void  {
   // this.storyID = this.reviewService.storyID;
    this.storyID = "0";
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
  loadFirebaseStorieReview(){
      this.availableReview = this.firebaseService.getItemById(this.storyID);
      console.log("__debug:" + this.firebaseService.getItemById(this.storyID));
  }

  /**
   * Router to page 'select-user-profile'
   * @author Alexander Stolz
   */
  goToSelectUserProfile() {
    this.router.navigate(["/select-user-profile"]);
  }

    /**
   * Router to page 'select-user-profile'
   * @author Alexander Stolz
   */
     goToAvailableStories() {
      this.router.navigate(["/available-stories"]);
    }

}
