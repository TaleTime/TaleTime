import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {StoryMenuPage} from "./story-menu.page";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: StoryMenuPage
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
  declarations: [StoryMenuPage]
})
export class StoryMenuPageModule {
}
