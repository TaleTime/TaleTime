import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {UserAccountPage} from "./user-account.page";
import {TranslateModule} from "@ngx-translate/core";
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';

const routes: Routes = [
  {
    path: "",
    component: UserAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgxAuthFirebaseUIModule
  ],
  declarations: [UserAccountPage]
})
export class UserAccountPageModule {
}
