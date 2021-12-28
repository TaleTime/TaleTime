import {Injectable} from "@angular/core";

@Injectable()
export class StoryInformation {
  // TODO tobi des todes!
  public id: string;
  public folder: string;
  public title: string;
  public author: string[];
  public date: number;
  public language: string;
  public child: boolean; // true if the story is safe for children, false if it should only be visible by adult profiles
  public shortDescription: string;
  public readers: Reader[];
  public medium: string;
  public cover: string; // TODO Base64 String für das Bild, zum darstellen des Covers
  public downloadCounter: number; // statistics: count amount of downloads from cloud
  public elementId: string;
  public tags: Tag[];
}

export class StoryInformationWithUrl extends StoryInformation {
  public url: string;
}

export class Reader {
  name: string;
  answersPartOfAudioFile: boolean;
}

/**
 * Tag used in the available storys page
 * and the editStorysPage.
 *
 * The colors attribute should match the
 * available colors on w3.css, which can be found
 * here:
 *
 * https://www.w3schools.com/w3css/w3css_colors.asp
 *
 * (minus the "w3-")
 */
export class Tag {
  name: string;
  color: string;
}
