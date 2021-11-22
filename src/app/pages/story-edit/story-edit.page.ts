import {Component, OnInit} from "@angular/core";
import {StoryInformation} from "../../models/storyInformation";
import {Router} from "@angular/router";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {StoryService} from "../../services/story/story.service";

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

  constructor(public router: Router,
              public storyInformationService: StoryInformationService,
              public storyService: StoryService) {
    this.model = this.storyInformationService.storyInformation;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

}
