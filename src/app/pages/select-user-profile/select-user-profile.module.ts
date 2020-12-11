import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { SelectUserProfilePage } from "./select-user-profile.page";

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
    MatCardModule
    //CreateUserProfilePageModule
  ],
  declarations: [
    SelectUserProfilePage
  ],
  entryComponents: [
    //CreateUserProfilePage
  ]
})
export class SelectUserProfilePageModule {
}
