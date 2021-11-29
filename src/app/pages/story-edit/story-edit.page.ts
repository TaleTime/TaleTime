import {Component, OnInit} from "@angular/core";
import {StoryInformation} from "../../models/storyInformation";
import {Router} from "@angular/router";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {StoryService} from "../../services/story/story.service";
import {FireBaseService} from "../../services/firebase/firebaseService";
import {FB_PATH_STORIES} from "../../constants/constants";
import {map} from "rxjs/operators";

/*
public id: string;
  public folder: string;
  public title: string;
  public author: string[];
  public date: number;
  public language: string;
  public child: boolean; //true if the story is safe for children, false if it should only be visible by adult profiles
  public shortDescription: string;
  public readers: Reader[];
  public medium: string;
  public cover: string;
 */

@Component({
  selector: "app-story-edit",
  templateUrl: "./story-edit.page.html",
  styleUrls: ["./story-edit.page.scss"],
})
export class StoryEditPage implements OnInit {
  model: StoryInformation;
  submitted: boolean;
  title: string;
  description: string;
  author: string[];

  constructor(public router: Router,
              public storyInformationService: StoryInformationService,
              public storyService: StoryService,
              private fireBaseService: FireBaseService
  ) {
    // load selected story
    this.model = this.storyInformationService.storyInformation;

    this.title = this.model.title;
    this.description = this.model.shortDescription;
    this.author = this.model.author;
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;
  }

  setStoryField(fieldName: string, value: string) {
    this.fireBaseService.setItem("stories/0/", fieldName, value);
  }

  setAuthorField(authorIndex: number) {
    this.setStoryField(`author/${authorIndex}`, "Lisa");
  }

  getStory() {
    this.fireBaseService.getItemById(FB_PATH_STORIES + "0/").pipe(map((a) => a.payload.toJSON()))
      .subscribe((story: StoryInformation) => {
        console.log("this is the story" + story.title);
      });
  }

  handleClick() {
    console.log("hey");
  }

  goBackToStoryDetails() {
    this.router.navigate(["story-details"]);
  }

}
