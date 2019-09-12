import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {StoryInformation} from "../models/storyInformation";
import {DEFAULT_READER, SINGLE_STORY_FILE_NAME} from "../constants/constants";
import {HttpClient} from "@angular/common/http";
import {ChapterAttributes, MtgaNextStoryNode, MtgaStoryNode, Story, StoryMetaData} from "../models/story/story";
import {Observable} from "rxjs";
import {SettingsService} from "./settings.service";
import {Storage} from "@ionic/storage";
import {File} from "@ionic-native/file/ngx";
import {SaveGameService} from "./save-game.service";
import {PublicStoryHelperService} from "./public-story-helper.service";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: "root"
})
export class StoryService {

  private readonly STORY_INFO_KEY = "STORY_INFO";
  private storyIndices: Map<string, number> = new Map<string, number>();
  private _stories: Array<StoryInformation> = new Array<StoryInformation>();
  private story: Story = null;
  private currentNode: MtgaStoryNode;

  constructor(
    protected platform: Platform,
    private logger: LoggerService,
    private fileService: File,
    private storage: Storage,
    private http: HttpClient,
    private settings: SettingsService,
    private saveGames: SaveGameService,
    private publicStoryHelper: PublicStoryHelperService
  ) {
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
        this.storage
          .get(this.STORY_INFO_KEY)
          .then((loadedStories) => {
            if (loadedStories) {
              this._stories = loadedStories;
              this.buildIndex();
            }
          })
          .catch((error) => {
            this.logger.error(error);
          });
      });
    });
  }

  /**
   * Create an index map
   * to map story.id to array index
   */
  private buildIndex(): void {
    this.storyIndices.clear();
    for (let i = 0; i < this._stories.length; i++) {
      const story = this._stories[i];
      this.storyIndices.set(story.id, i);
    }
  }

  public get stories(): Array<StoryInformation> {
    return this._stories;
  }

  /**
   * Add a new story to the storage and save
   * @param story Story to add
   */
  public addStory(story: StoryInformation) {
    const exists = this.storyIndices.get(story.id);
    if (!exists) {
      const index = this._stories.push(story) - 1;
      this.storyIndices.set(story.id, index);
      this.storage.set(this.STORY_INFO_KEY, this._stories);
    }
  }

  /**
   * Returns the story information matching the id or null if it does not exist
   * @param id id of the story to look for
   */
  public getStoryInformation(id: string): StoryInformation {
    const index = this.storyIndices.get(id);
    if (index != null) {
      return this._stories[index];
    } else {
      return null;
    }
  }

  /**
   * Checks if a story already exists
   * @param storyId Story id
   */
  public exists(storyId: string) {
    const index = this.storyIndices.get(storyId);
    return index != null;
  }

  /**
   * Deletes a story from the database (does not cleanup files on SD)
   * @param id id of the story to be removed
   */
  public deleteStory(id: string) {
    const index = this.storyIndices.get(id);
    if (index != null) {
      this._stories.splice(index, 1);
      this.buildIndex();
      this.storage.set(this.STORY_INFO_KEY, this._stories);
    }
  }

  /**
   * Load one of the storys that are deployed within the APK
   * @param story device story to load (one of the mock stories)
   * @param shortLangCode language code (2 chars)
   */
  private loadDeviceStory(
    story: StoryInformation,
    shortLangCode: string
  ): Observable<boolean> {
    const storyJson =
      "assets/stories/" +
      story.id +
      "/" +
      shortLangCode +
      "/" +
      SINGLE_STORY_FILE_NAME;
    return Observable.create((observer) => {
      this.http.get(storyJson).subscribe((s: Story) => {
        this.story = s;
        this.loadFirstNode();
        observer.next(true);
        observer.complete();
      });
    });
  }

  /**
   * Load one of the downloaded stories
   * @param story cloud/public story to load from SD/Root directory
   * @param shortLangCode language code (2 chars)
   */
  private loadPublicStory(
    story: StoryInformation,
    shortLangCode: string
  ): Observable<boolean> {
    const storyJsonBasePath = this.publicStoryHelper.getStoryJsonFolderPath(
      story,
      shortLangCode
    );
    return Observable.create((observer) => {
      this.fileService
        .readAsText(storyJsonBasePath, SINGLE_STORY_FILE_NAME)
        .then((jsonText) => {
          this.story = JSON.parse(jsonText);
          this.loadFirstNode();
          observer.next(true);
          observer.complete();
        });
    });
  }

  /**
   * Loads a story (cloud or device based)
   * @param id id of the story to load
   */
  public loadStory(id: string): Observable<boolean> {
    const lang = this.settings.getShortLangCode();
    const story = this.getStoryInformation(id);
    this.logger.log(
      "StoryService-loadStory(): Loading:" + JSON.stringify(story)
    );
    this.logger.log("Loading story <" + id + "> with language <" + lang + ">");
    if (story.medium === "cloud") {
      return this.loadPublicStory(story, lang);
    } else {
      return this.loadDeviceStory(story, lang);
    }
  }

  public getStoryAttributes(): StoryMetaData {
    if (this.story) {
      return this.story["mtga-story"].attributes;
    } else {
      return null;
    }
  }

  protected loadFirstNode(): void {
    this.loadNode(0);
  }

  public loadNode(i: number) {
    this.currentNode = this.story["mtga-story"]["mtga-story-node"][
      i.toString()
      ];
  }

  public loadNodeForAnswer(i: number): void {
    // workaround TODO need to fix data
    let id: number;
    if (this.currentNode["mtga-nextStoryNode"][i]) {
      id = this.currentNode["mtga-nextStoryNode"][i].attributes.Id - 1;
    } else {
      id = this.currentNode["mtga-nextStoryNode"].attributes.Id - 1;
    }
    this.logger.log(
      "Answer #" +
      i +
      " matched to the next node with the id: " +
      id +
      ". Loading node " +
      id
    );
    this.loadNode(id);
  }

  public getAnswers(): MtgaNextStoryNode[] {
    const result = [];

    for (const item in this.currentNode["mtga-nextStoryNode"]) {
      // workaround, TODO need to fix data
      if (Number.isNaN(+item)) {
        result.push(this.currentNode["mtga-nextStoryNode"]);
        break;
      } else {
        result.push(this.currentNode["mtga-nextStoryNode"][item]);
      }
    }
    return result;
  }

  public getText(): string {
    return this.currentNode["mtga-nodeText"].value;
  }

  public getChapterAtrributes(): ChapterAttributes {
    return this.currentNode.attributes;
  }

  getCurrentAudioSrc(): string {
    return this.currentNode.attributes.audioSrc;
  }

  public isCurrentSpeakerReadingAnswersOut(): boolean {
    const storyId = this.getStoryAttributes().id;
    const reader = this.saveGames.loadSavegame(storyId).reader;
    this.logger.log("Current speaker is " + reader);

    if (reader === DEFAULT_READER) {
      return false;
    } else {
      for (const r of this.getStoryInformation(storyId).readers) {
        if (r.name === reader) {
          this.logger.log(
            "Found reader and returning " + r.answersPartOfAudioFile
          );
          return r.answersPartOfAudioFile;
        }
      }
    }

    // if nothing was found assume the answers need to be read out
    return false;
  }
}
