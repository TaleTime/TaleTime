import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ChangeUserAccountPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-user-account-pin',
  templateUrl: 'change-user-account-pin.html',
})
export class ChangeUserAccountPinPage {
  createSuccess: boolean = false;
  credentials = { oldPin: '', pin: '', retypePin: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeUserAccountPinPage');
  }

  changePin() {
    this.authProvider.changePin(this.credentials.oldPin, this.credentials.pin, this.credentials.retypePin).subscribe(response => {
      if (response.success) {
        this.navCtrl.pop();
      } else {
        // TODO popup with info
        console.log(response.reason);
      }
    }, error => {
      console.log("ChangeUserAccountPinPage-changePin(): " + error.prototype.toString() + ":" + JSON.stringify(error));
    });
  }

}
