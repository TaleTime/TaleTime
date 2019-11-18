import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {SelectUserProfilePage} from "./select-user-profile.page";
import {TranslateModule} from "@ngx-translate/core";
import {CreateUserProfilePage} from "../create-user-profile/create-user-profile.page";
import {CreateUserProfilePageModule} from "../create-user-profile/create-user-profile.module";

const routes: Routes = [
  {
    path: "",
    component: SelectUserProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    //CreateUserProfilePageModule
  ],
  declarations: [
    SelectUserProfilePage
  ],
  entryComponents: [
    // CreateUserProfilePage
  ]
})
export class SelectUserProfilePageModule {
}
