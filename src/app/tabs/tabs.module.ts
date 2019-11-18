import {IonicModule} from "@ionic/angular";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {TabsPageRoutingModule} from "./tabs.router.module";

import {TabsPage} from "./tabs.page";
import {TranslateModule} from "@ngx-translate/core";
import {StoryMenuPageModule} from "../pages/story-menu/story-menu.module";

@NgModule({
  imports: [
    StoryMenuPageModule,
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
