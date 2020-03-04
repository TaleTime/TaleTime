import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";

import {StartPage} from "./start.page";

import {TranslateModule} from "@ngx-translate/core";
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: StartPage
      }
    ]),
    TranslateModule,
    NgxAuthFirebaseUIModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {
}
