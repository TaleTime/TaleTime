import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StoryEditPageRoutingModule } from "./story-edit-routing.module";

import { StoryEditPage } from "./story-edit.page";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoryEditPageRoutingModule
  ],
  declarations: [StoryEditPage]
})
export class StoryEditPageModule {}
