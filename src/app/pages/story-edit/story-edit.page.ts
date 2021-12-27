import {Component} from "@angular/core";
import {StoryInformation} from "../../models/storyInformation";
import {Router} from "@angular/router";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {FireBaseService} from "../../services/firebase/firebaseService";
import {FB_PATH_STORIES} from "../../constants/constants";
import {map} from "rxjs/operators";
import {StoryService} from "../../services/story/story.service";

@Component({
  selector: "app-story-edit",
  templateUrl: "./story-edit.page.html",
  styleUrls: ["./story-edit.page.scss"],
})
export class StoryEditPage {
  submitted: boolean;
  title: string;
  description: string;
  // used to render one input field for each author
  authors: string[];
  // used to store the authors during editing
  // using authors would retrigger the *for directive
  // of angular on each edit
  tempAuthors: string[];

  constructor(public router: Router,
              public storyInformationService: StoryInformationService,
              private fireBaseService: FireBaseService,
              private storyService: StoryService
  ) {
    // load the currently selected story
    const currentStoryInformation = this.storyInformationService.storyInformation;

    // load current story information from model
    this.title = currentStoryInformation.title;
    this.description = currentStoryInformation.shortDescription;
    this.authors = currentStoryInformation.author;
    this.tempAuthors = [...currentStoryInformation.author];
  }

  /**
   * Submits data to firebase and returns to the StoryDetails screen
   */
  onSubmit() {
    this.setStoryField("shortDescription", this.description);
    this.setStoryField("title", this.title);
    this.setAuthors();
    this.submitted = true;

    this.storyService.fetchAvailableStories();
    this.updateSelectedStory();
    this.goBackToStoryDetails();
  }

  /**
   * Updates the currently selected story, which is saved in the StoryInformationService
   */
  updateSelectedStory() {
    this.storyInformationService.storyInformation.title = this.title;
    this.storyInformationService.storyInformation.shortDescription = this.description;
    this.storyInformationService.storyInformation.author = this.authors;
  }

  /**
   * Updates one story field on firebase
   * @param fieldName the to be updated field (e.g. date, author, ...)
   * @param value the value to update the field to
   */
  setStoryField(fieldName: string, value: string) {
    this.fireBaseService.setItem("stories/0/", fieldName, value);
  }

  /**
   * Sets the author field at the authorIndex to the specified value.
   * E.g. .../stories/0/author/0 with 0 as the authorIndex.
   * @param authorIndex is 0 for the first author
   * @param value is the name of the author
   */
  setAuthorField(authorIndex: number, value: string) {
    this.setStoryField(`author/${authorIndex}`, value);
  }

  /**
   * Sets all n authors saved on firebase to the authors specified in
   * the form.
   */
  setAuthors() {
    for (let i = 0; i < this.authors.length; i++) {
      this.setAuthorField(i, this.authors[i]);
    }
  }

  /**
   * Retrieves the cloud story at index 0 and saves it to the local model.
   */
  refreshLocalStory() {
    this.fireBaseService.getItemById(FB_PATH_STORIES + "0/").pipe(map((a) => a.payload.toJSON()))
      .subscribe((story: StoryInformation) => {
        console.log(story.shortDescription);
        this.storyInformationService.storyInformation = story;
      });
  }

  /**
   * Navigates back to the storyDetails-Screen.
   */
  goBackToStoryDetails() {
    this.router.navigate(["story-details"]);
  }

}
