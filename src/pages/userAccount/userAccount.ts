/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-20
 */
import { Component } from '@angular/core';
import { App, NavController, AlertController, Platform, IonicPage } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { StartPage } from '../../pages/start/start'
import { ChangeUserAccountPinPage } from "../../pages/change-user-account-pin/change-user-account-pin";

import { AuthProvider } from '../../providers/auth/auth';

import { UserAccount } from '../../datamodels/userAccount';

@Component({
  selector: 'page-userAccount',
  templateUrl: 'userAccount.html'
})
export class UserAccountPage {

  private userAccount: UserAccount;

  constructor(private app: App, private navCtrl: NavController, private platform: Platform, private authProvider: AuthProvider) {
    this.platform.ready().then(
      () => {
        this.userAccount = this.authProvider.currentUserAccount;
      }
    )
  }

  public changePin() {
    this.navCtrl.push(ChangeUserAccountPinPage);
  }

  public logout() {
    this.authProvider.logout().subscribe(success => {
      // TODO is this pretty?
      this.app.getRootNav().setRoot(StartPage);
    });
  }
}
