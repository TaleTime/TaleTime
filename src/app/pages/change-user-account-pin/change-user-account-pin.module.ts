import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {ChangeUserAccountPinPage} from "./change-user-account-pin.page";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: ChangeUserAccountPinPage,
    outlet: "changeUserAccountPin"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule

  ],
  declarations: [ChangeUserAccountPinPage],
  exports: [ChangeUserAccountPinPage]

})
export class ChangeUserAccountPinPageModule {
}
