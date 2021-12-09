import { Component, OnInit,NgZone,ApplicationRef } from '@angular/core';
import {Router} from "@angular/router";
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
import { sha256 } from "js-sha256";

@Component({
  selector: 'app-review',
  templateUrl: './story-review.component.html',
  styleUrls: ['./story-review.component.scss'],
})
export class StoryReviewComponent implements OnInit {
  public isLoaded:boolean = true;
  public currentStoryID:string;
  public currentStoryTitle:string;
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;
  public activeUserProfile: UserProfile;

  public availableReview: Array<Review> = [];

  private pathToCurrentUser =
  FB_PATH_USERS + this.authService.currentUserAccount.uid + "/";
  public userId:string = this.authService.currentUserAccount.uid;

  constructor(
    private app: ApplicationRef,
    private zone: NgZone,
    private firebaseService: FireBaseService,
    private reviewService: ReviewServiceService,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService,
    private profileService: ProfileService,
    ) { 

  }



  
  ngOnInit():void  {
    this.currentStoryID = this.reviewService.storyID;
    this.currentStoryTitle = this.reviewService.storyTitle;
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
      this.firebaseService.getAllItems("ratings/"+this.currentStoryTitle).pipe(map((action) => action.map((a) => {
        const payload = a.payload.val();
          this.availableReview.push(payload);
        }))).subscribe();
  }
  result: any = [];
  removeDuplicates(): any {
    this.availableReview.forEach((item) => {
       if (this.result.indexOf(item) < 0) {
          this.result.push(item);
       }
    });
    return this.result;
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

    /**
     * Add new review for story
     */
    addNewReview(reviewText:string){
      let today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      let newStoryReview:  Review ={
         author: this.activeUserProfileName,
         authorId:this.userId,
         comment: reviewText,
         date: mm + '/' + dd + '/' + yyyy,
         ratingId: "0"
      }

      let key = this.firebaseService.addNewItem("ratings/"+this.currentStoryTitle, newStoryReview)

      newStoryReview.ratingId = key;

      this.firebaseService.setItem(
        "ratings/"+this.currentStoryTitle+ "/"+key+ "/",
        "ratingId",
        key
      );


    }

    /**
     * Delete specific story
     * @author Alexander Stolz
     * @param storyId Given story id
     */
      deleteReview(storyId:any){

      this.firebaseService.deleteItem("ratings/"+ 
      this.currentStoryTitle+     
      "/"+storyId)

      
    }
    
    
}
