import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file/ngx";
import { APP_NAME, READER_DIR, FILETYPE_MP4 } from "../../app/constants";
import {
  StoryInformationWithUrl,
  StoryInformation
} from "../../datamodels/storyInformation";
import { SettingsService } from "../../providers/settings/settings";
import {LoggerService} from "../logger/logger";
/**
 * Helper class to access file/folder paths of downloaded (public) stories
 * @Author Max Weiler
 */
@Injectable()
export class PublicStoryHelperService {
  private publicStoryBasePath: string;
  constructor(
    private platform: Platform,
    private file: File,
    private settings: SettingsService
  ) {
    this.platform.ready().then((platform) => {
      this.publicStoryBasePath =
        this.file.externalRootDirectory + APP_NAME + "/";
    });
  }

  /**
   * Returns the path to the folder where the main story json in the specified language is located
   * @param story the story information of the downloaded/public story
   * @param lang preferred language
   */
  public getStoryJsonFolderPath(
    story: StoryInformation | StoryInformationWithUrl,
    lang: string
  ): string {
    return this.publicStoryBasePath + story.id + "/" + lang + "/";
  }

  /**
   * Returns the absolute path to a specific audio asset of the story
   * @param story the story information of the downloaded/public story
   * @param audioFile Filename assigned to the current story node
   * @param reader ID of the reader
   */
  public getAudioPathForStory(
    story: StoryInformation | StoryInformationWithUrl,
    audioFile: string,
    reader: string
  ): string {
    let path = this.publicStoryBasePath + story.id + "/";
    path =
      path +
      this.settings.getShortLangCode() +
      READER_DIR +
      reader +
      "/" +
      audioFile +
      FILETYPE_MP4;
    return path;
  }

  /**
   * Returns the absolute path to the story icon for external stories
   * @param story External Story
   */
  public getThumbnailPathForStory(
    story: StoryInformation | StoryInformationWithUrl
  ) {
    return this.publicStoryBasePath + story.id + "/icon.png";
  }
}
