import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HTTP } from '@ionic-native/http';
import { StoryInformation, StoryInformationWithUrl } from "../../datamodels/storyInformation";
import { StoryProvider } from "../../providers/story/story";
import { AlertProvider } from "../../providers/alert/alert";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { FileReader } from "@ionic-native/file";
import { HttpClient } from "@angular/common/http";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Zip } from "@ionic-native/zip";
import { Platform } from "ionic-angular/platform/platform";
import { LoadingController } from "ionic-angular/components/loading/loading-controller";
import { LoadingOptions } from "ionic-angular/components/loading/loading-options";
import { Loading } from "ionic-angular/components/loading/loading";
import { NgZone } from "@angular/core";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { SimpleToastProvider } from "../../providers/simple-toast/simple-toast";

@Component({
  selector: 'page-availableStories',
  templateUrl: 'availableStories.html'
})

/**
 * Die Klasse wird momentan als provisorischer Store zum testen genutzt
 */
export class AvailableStoriesPage {
  public availableStories: Array<StoryInformationWithUrl> = new Array();
  public readonly PUBLIC_STORY_URL: string = 'https://raw.githubusercontent.com/TaleTime/Stories/master/index.json';

  constructor(
    private zone: NgZone,
    public navCtrl: NavController,
    private http: HTTP,
    private translate: TranslateService,
    private storyProvider: StoryProvider,
    private alert: AlertProvider,
    private platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private zip: Zip,
    private loadingCntrl: LoadingController,
    private toastProvider : SimpleToastProvider) {
    this.loadDeviceDefaultStories();
    this.platform.ready().then(() => {
      this.loadPublicStories();
    });
  }

  /**
   * Loads the (hardcoded) default stories into the availableStories array
   */
  loadDeviceDefaultStories() {
    let newstory = new StoryInformation();
    newstory.title = "Der Struwwelpeter";
    newstory.id = "Der_Struwwelpeter";
    newstory.author = ["Heinrich Heine"];
    newstory.date = 1844;
    newstory.language = "Deutsch";
    newstory.shortDescription = "In dem Buch erzählt Hoffmann geschichten von Kindern, die nicht brav sind, nicht auf ihre Eltern hören und denen deshalb allerlei grausames Unheil widerfährt.";
    newstory.medium = 'device';
    newstory.readers = [{ name: "Johannes Ackner", answersPartOfAudioFile: false }];
    this.availableStories.push(<StoryInformationWithUrl>newstory);

    newstory = new StoryInformation();
    newstory.title = "Der verlorene Ball";
    newstory.id = "Der_verlorene_Ball";
    newstory.author = ["Sarah Philippi", "Lisa Roisch"];
    newstory.date = 2016;
    newstory.cover = "Titelbild_Der_verlorene_Ball-02.png"
    newstory.language = "Deutsch";
    newstory.shortDescription = "Hey, ich bin eine Beschreibung von der verlorenen Ball";
    newstory.medium = 'device';
    newstory.readers = [{ name: "Mama", answersPartOfAudioFile: false },
    { name: "Papa", answersPartOfAudioFile: false },
    { name: "Kevin", answersPartOfAudioFile: true },
    { name: "Raoul", answersPartOfAudioFile: false }];
    this.availableStories.push(<StoryInformationWithUrl>newstory);


  }

  addStory(story: StoryInformation | StoryInformationWithUrl) {
    console.log("addStory(): " + JSON.stringify(story));
    if (story.medium === 'cloud' && 'url' in story) {
      // story is a public story and the URL is defined in the object
      this.installPublicStory(<StoryInformationWithUrl>story);
    } else if(this.storyProvider.exists(story.id)){
      //story already exists
      this.alertStoryAlreadyExists(story.title);
    } else {
      //add new (non cloud) story
      this.storyProvider.addStory(story);
      this.alertStoryAddedSucessfully(story.title);
    }
  }


  /**
   * Load the public stories available from the remote JSON file or an API
   * specified by the PUBLIC_STORY_URL
   */
  public loadPublicStories() {
    const that = this;
    this.http.get(this.PUBLIC_STORY_URL, {}, {})
      .then(data => {
        let content = data = JSON.parse(data.data);
        for (var i = 0; i < content.length; i++) {
          content[i].medium = 'cloud'; // TODO const and object
          that.availableStories.push(content[i]);
        }
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  /**
   * Creates a loading view without presenting it
   * @param content content for the loading view
   */
  private createLoading(content: string): Loading {
    let options: LoadingOptions = {
      content: content
    };
    let loading = this.loadingCntrl.create(options);
    return loading;
  }

  private downloadProgressStr(title: string, loaded: number, total: number): string {
    return this.translate.instant('STORY_DOWNLOAD_PROGRESS', {
      "title": title,
      "progress": Math.round((loaded / total) * 100) + '%'
    });
  }

  private unpackingProgressStr(title: string, loaded: number, total: number): string {
    return this.translate.instant('STORY_UNPACKING_PROGRESS', {
      "title": title,
      "progress": Math.round((loaded / total) * 100) + '%'
    });
  }

  /**
   * Updates the content of a loading and forces a ui refresh
   * @param content new content for the loading
   * @param loading loading to be updated
   */
  private updateLoadingContent(content: string, loading: Loading) {
    //Without zone.run, the new content is not displayed
    this.zone.run(() => {
      loading.setContent(content);
    });
  }

  /**
   * Downloads and installs a story from a remote URL specified in the StoryInformationWithUrl
   * @param story Story to download and install
   */
  public installPublicStory(story: StoryInformationWithUrl) {
    if (this.storyProvider.exists(story.id)) {
      this.alertStoryAlreadyExists(story.title);
    } else {
      let url = story.url;
      let zipFileName = story.id + ".zip";
      const targetFolderForZip = this.file.externalRootDirectory + "taletime/";
      const zipFilePath = targetFolderForZip + zipFileName;
      let loading = this.createLoading(this.downloadProgressStr(story.title, 0, 100));
      const fileTransfer: FileTransferObject = this.transfer.create();
      loading.present();
      fileTransfer.onProgress((event: ProgressEvent) => {
        //The loading instance hast to be refreshed within the zone.run method because otherwise
        //the progress is not updated automatically
        this.updateLoadingContent(this.downloadProgressStr(story.title, event.loaded, event.total), loading);
      });
      //Download the Zip-File
      fileTransfer.download(url, zipFilePath).then((entry) => {
        let localUrl = entry.toURL();
        //Unzip into the story folder
        this.zip.unzip(localUrl, targetFolderForZip, (progressEvent) => {
          //Display unpacking progress
          this.updateLoadingContent(this.unpackingProgressStr(story.title, progressEvent.loaded, progressEvent.total), loading);
        }).then((result) => {
          if (result === 0) {
            this.file.removeFile(targetFolderForZip, zipFileName).then(removeRes => {
              this.storyProvider.addStory(story);
              loading.dismiss();
              this.alertStoryAddedSucessfully(story.title);
            }).catch(error => {
              loading.dismiss();
              this.toastProvider.displayToast(this.translate.instant('STORY_ZIP_REMOVE_FAIL'));
              console.log("Could not remove downloaded Zip!");
            });
          } else if (result === -1) {
            console.log('Unzipping the file failed!');
            this.toastProvider.displayToast(this.translate.instant('STORY_ZIP_UNPACK_FAIL'));
          }
        });

      }, (error) => {
        loading.dismiss();
        this.toastProvider.displayToast(this.translate.instant('STORY_DOWNLOAD_FAIL'));
        console.error("Could not download the file: " + url + " to path: " + zipFilePath);
        console.error(JSON.stringify(error));
      });
    }
  }

  /**
   * Alert for already existing story
   * @param storyTitle title of the story
   */
  private alertStoryAlreadyExists(storyTitle: string) {
    //story already exists --> display a message and return
    this.alert.createAlert(
      this.translate.instant('STORY_ALREADY_EXISTS_TITLE'),
      '',
      [{ text: this.translate.instant('COMMON_OK') }],
      this.translate.instant('STORY_ALREADY_EXISTS_MSG', { story_title: storyTitle })
    ).present();
  }

  /**
   * Alert for successful installation of a story
   * @param storyTitle title of the new story
   */
  private alertStoryAddedSucessfully(storyTitle: string) {
    this.alert.createAlert(
      this.translate.instant('STORY_ADDED'),
      '',
      [{ text: this.translate.instant('COMMON_OK') }],
      this.translate.instant('STORY_ADDED_MSG', { story_title: storyTitle })
    ).present();
  }

}
