/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-28
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProfile } from "../../datamodels/userProfile"; // for avatars

@Component({
  selector: 'page-createUserProfile',
  templateUrl: 'createUserProfile.html'
})

export class CreateUserProfilePage {
  activeAvatarId: number;
  profileCredentials = { name: '', avatarId: 0, child: false };
  profileAvatars;

  constructor(private navCtrl: NavController, private authProvider: AuthProvider) {
    this.profileAvatars = UserProfile.avatars();
    this.selectAvatar(null, 0);
  }


  public selectAvatar(event, avatarId) {
    if (event) {
      event.stopPropagation();
    }

    this.activeAvatarId = avatarId;
  }

  public create() {
    this.profileCredentials.avatarId = this.activeAvatarId;

    this.authProvider.createUserProfile(this.profileCredentials).subscribe(success => {
      if (success) {
        this.close();
      }
    }, error => {
      console.log("CreateUserProfilePage-create(): " + JSON.stringify(error));
    });
  }

  public close() {
    this.navCtrl.pop();
  }

}
