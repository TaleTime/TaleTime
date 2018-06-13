/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-19
 */
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { SelectUserProfilePage } from '../selectUserProfile/selectUserProfile';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-createUserAccount',
  templateUrl: 'createUserAccount.html'
})

export class CreateUserAccountPage {
  createSuccess = false;
  loading: Loading;
  registerCredentials = { name: '', email: '', pin: '' };

  constructor(private navCtrl: NavController, private authProvider: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public register() {
    this.showLoading();

    this.authProvider.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;

        // automatic login user
        this.login();
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    }, error => {
      this.showPopup("Error", error);
    });
  }

  public login() {
    this.authProvider.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(SelectUserProfilePage);
      } else {
        this.showError("Access Denied");
      }
    }, error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
