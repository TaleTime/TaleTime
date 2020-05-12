import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";
import {CreateUserAccountPage} from "./create-user-account.page";
import {TranslateModule} from "@ngx-translate/core";
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';

const routes: Routes = [
  {
    path: "",
    component: CreateUserAccountPage
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
  declarations: [CreateUserAccountPage]
})
export class CreateUserAccountPageModule {
}
