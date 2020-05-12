import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth/auth.service";
import {UserProfile} from "../../models/userProfile"; // for avatars

@Component({
  selector: "app-create-user-profile",
  templateUrl: "./create-user-profile.page.html",
  styleUrls: ["./create-user-profile.page.scss"],
})
export class CreateUserProfilePage implements OnInit {
  activeAvatarId: number;
  profileCredentials = {name: "", avatarId: 0, child: false};
  profileAvatars;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {
    if(this.authService.currentUserAccount == null){
      this.router.navigate(["/start"]);
    }
    this.profileAvatars = UserProfile.avatars();
    this.selectAvatar(null, 0);
  }

  ngOnInit() {
  }

  public selectAvatar(event, avatarId) {
    if (event) {
      event.stopPropagation();
    }

    this.activeAvatarId = avatarId;
  }

  public create() {
    this.profileCredentials.avatarId = this.activeAvatarId;

    console.log("Create user profile");
    this.authService.createUserProfile(this.profileCredentials).subscribe(
      (success) => {
        if (success) {
          this.close();
        }
      },
      (error) => {
        console.log("CreateUserProfilePage-create(): " + JSON.stringify(error));
      }
    );
  }

  public close() {
    this.router.navigate(["select-user-profile"]);
  }
}
