import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import { StoryReviewComponent } from "./story-review.component";
import {TranslateModule} from "@ngx-translate/core";


const routes: Routes = [
  {
    path: "",
    component: StoryReviewComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [StoryReviewComponent]
})
export class StoryReviewModule {
}
