import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { UserAccountPage } from "./user-account.page";

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
