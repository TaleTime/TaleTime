import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {StoryMenuPage} from "./story-menu.page";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltipModule} from "@angular/material/tooltip";

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
        TranslateModule,
        MatTooltipModule
    ],
  declarations: [StoryMenuPage]
})
export class StoryMenuPageModule {
}
