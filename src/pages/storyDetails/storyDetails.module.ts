import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StoryDetailsPage } from "./storyDetails";

@NgModule({
  declarations: [StoryDetailsPage],
  imports: [IonicPageModule.forChild(StoryDetailsPage)],
  exports: [StoryDetailsPage]
})
export class StoryDetailsPageModule {}
