import {Component} from "@angular/core";
import {StoryInformation, Tag} from "../../models/storyInformation";
import {Router} from "@angular/router";
import {StoryInformationService} from "../../services/story-information/story-information.service";
import {FireBaseService} from "../../services/firebase/firebaseService";
import {FB_PATH_STORIES} from "../../constants/constants";
import {map} from "rxjs/operators";
import {StoryService} from "../../services/story/story.service";
import {AlertController} from "@ionic/angular";

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
  tags: Tag[];

  constructor(public router: Router,
              public storyInformationService: StoryInformationService,
              private fireBaseService: FireBaseService,
              private storyService: StoryService,
              private alertController: AlertController
  ) {
    // load the currently selected story
    const currentStoryInformation = this.storyInformationService.storyInformation;

    // load current story information from model
    this.title = currentStoryInformation.title;
    this.description = currentStoryInformation.shortDescription;
    this.authors = currentStoryInformation.author;
    this.tempAuthors = [...currentStoryInformation.author];
    this.tags = [...currentStoryInformation.tags];
  }

  /**
   * Submits data to firebase and returns to the StoryDetails screen
   */
  onSubmit() {
    this.setStoryField("shortDescription", this.description);
    this.setStoryField("title", this.title);
    this.setAuthors();
    this.setTags();
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
  setStoryField(fieldName: string, value: any) {
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

  setTags() {
    this.setStoryField("tags/", {});
    console.log("tags sieht so aus::: " + this.tags);
    for (let i = 0; i < this.tags.length; i++) {
      this.setStoryField(`tags/${i}`, {name: this.tags[i].name, color: this.tags[i].color});
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

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Prompt!",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Tag name"
        },
        {
          name: "color",
          type: "text",
          id: "color",
          placeholder: "Tag color"
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }, {
          text: "Create",
          handler: (alertData) => {
            const newTag = {name: alertData.name, color: alertData.color} as Tag;
            this.tags.push(newTag);
            console.log("Confirm Ok" + newTag.name);
          }
        }
      ]
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    await alert.inputs;
    console.log("onDidDismiss resolved with role", role);
  }

  async presentAlertConfirm(index: number) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Delete tag?",
      message: "Soll der Tag" + this.tags[index].name + " gelöscht werden?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        }, {
          text: "Delete",
          handler: () => {
            if (index > -1) {
              this.tags.splice(index, 1);
            }
            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }


}
