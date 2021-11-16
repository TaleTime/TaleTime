import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FileTransfer,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { HTTP } from "@ionic-native/http/ngx";
import { Zip } from "@ionic-native/zip/ngx";
import { LoadingController, NavController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FireBaseService } from "src/app/services/firebase/firebaseService";
import {
  CLOUD,
  FB_PATH_STORIES,
  FB_PATH_USERS,
} from "../../constants/constants";
import {
  StoryInformation,
  StoryInformationWithUrl,
} from "../../models/storyInformation";
import { UserProfile } from "../../models/userProfile";
import { AlertService } from "../../services/alert/alert.service";
import { AuthService } from "../../services/auth/auth.service";
import { LanguageService } from "../../services/language/language.service";
import { ProfileService } from "../../services/profile/profile.service";
import { SimpleToastService } from "../../services/simple-toast/simple-toast.service";
import { StoryService } from "../../services/story/story.service";
import { convertSystemLangToAvailableLanguage } from "../../Util/UtilLanguage";

/**
 * Die Klasse wird momentan als provisorischer Store zum testen genutzt
 */
@Component({
  selector: "app-available-stories",
  templateUrl: "./available-stories.page.html",
  styleUrls: ["./available-stories.page.scss"],
})
export class AvailableStoriesPage implements OnInit {
  activeUserProfileName: string;
  activeUserProfileAvatarName: string;
  private activeUserProfile: UserProfile;

  public availableStories: Array<StoryInformationWithUrl> = [];
  public readonly PUBLIC_STORY_URL: string =
    "https://raw.githubusercontent.com/TaleTime/TaleTime/feature_firebase-cloud-stories/index.json";

  private pathToCurrentUser =
    FB_PATH_USERS + this.authService.currentUserAccount.uid + "/";

  constructor(
    private zone: NgZone,
    private authService: AuthService,
    public navCtrl: NavController,
    private router: Router,
    private http: HTTP,
    private translate: TranslateService,
    private storyService: StoryService,
    private alert: AlertService,
    private platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private zip: Zip,
    private loadingCtrl: LoadingController,
    private toastService: SimpleToastService,
    private profileService: ProfileService,
    private languageService: LanguageService,
    private firebaseService: FireBaseService
  ) {}

  /*
  ionViewWillEnter() {
    this.loadDeviceDefaultStories();
    this.loadPublicStories();
  }
   */
  ngOnInit() {
    this.activeUserProfile = this.profileService.getActiveUserProfile();

    if (this.activeUserProfile) {
      this.activeUserProfileName = this.activeUserProfile.name;
      this.activeUserProfileAvatarName = this.activeUserProfile.avatar.name;
    }
    this.loadDeviceDefaultStories();
    this.loadPublicStories();
  }

  /**
   * Loads the (hardcoded) default stories into the availableStories array
   * TODO Strings per Setter setzen, um im Setter eine Überprüfung des Strings vorzunehmen
   */
  async loadDeviceDefaultStories() {
    const lang = convertSystemLangToAvailableLanguage(
      this.languageService.selected
    );
    const storieForChild = this.activeUserProfile.child;
    this.availableStories = this.storyService.getUserStoriesByLanguageAndChild(
      lang,
      storieForChild
    );
  }

  goToSelectUserProfile() {
    this.router.navigate(["/select-user-profile"]);
  }

  addStory(story: StoryInformation | StoryInformationWithUrl) {
    if (story.medium === CLOUD && "url" in story) {
      // story is a public story and the URL is defined in the object
      this.installPublicStory(story as StoryInformationWithUrl);
    } else if (this.activeUserProfile.isStoryPresent(story.id)) {
      // story already exists
      this.alertStoryAlreadyExists(story.title);
    } else {
      this.activeUserProfile.addStory(story);
      this.firebaseService.setItem(
        this.pathToCurrentUser +
          this.activeUserProfile.id +
          "/" +
          FB_PATH_STORIES,
        story.id,
        story
      );

      this.alertStoryAddedSuccessfully(story.title);
    }
  }

  /**
   * Load the public stories available from the remote JSON file or an API
   * specified by the PUBLIC_STORY_URL
   */
  public loadPublicStories() {
    const that = this;
    this.http
      .get(this.PUBLIC_STORY_URL, {}, {})
      .then((data) => {
        // von mir:
        console.log("public stories ::" + data.data);
        // von den:
        const content = (data = JSON.parse(data.data));
        for (const item of content) {
          item.medium = CLOUD;
          that.availableStories.push(item);
        }
      })
      .catch((error) => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
  }

  /**
   * Creates a loading view without presenting it
   * @param content content for the loading view
   */
  private async createLoading(content: string) {
    return await this.loadingCtrl.create({
      message: content,
    });
  }

  private downloadProgressStr(
    title: string,
    loaded: number,
    total: number
  ): string {
    return this.translate.instant("STORY_DOWNLOAD_PROGRESS", {
      title,
      progress: Math.round((loaded / total) * 100) + "%",
    });
  }

  private unpackingProgressStr(
    title: string,
    loaded: number,
    total: number
  ): string {
    return this.translate.instant("STORY_UNPACKING_PROGRESS", {
      title,
      progress: Math.round((loaded / total) * 100) + "%",
    });
  }

  /**
   * Updates the content of a loading and forces a ui refresh
   * @param content new content for the loading
   * @param loading loading to be updated
   */
  private updateLoadingContent(content: string, loading) {
    // Without zone.run, the new content is not displayed
    this.zone.run(() => {
      loading.setContent(content);
    });
  }

  /**
   * Downloads and installs a story from a remote URL specified in the StoryInformationWithUrl
   * @param story Story to download and install
   */
  public async installPublicStory(story: StoryInformationWithUrl) {
    if (this.storyService.exists(story.id)) {
      this.alertStoryAlreadyExists(story.title);
    } else {
      const url = story.url;
      const zipFileName = story.id + ".zip";
      const targetFolderForZip = this.file.externalRootDirectory + "taletime/";
      const zipFilePath = targetFolderForZip + zipFileName;
      const loading = await this.createLoading(
        this.downloadProgressStr(story.title, 0, 100)
      );
      const fileTransfer: FileTransferObject = this.transfer.create();
      await loading.present();
      fileTransfer.onProgress((event: ProgressEvent) => {
        // The loading instance hast to be refreshed within the zone.run method because otherwise
        // the progress is not updated automatically
        this.updateLoadingContent(
          this.downloadProgressStr(story.title, event.loaded, event.total),
          loading
        );
      });
      // Download the Zip-File
      fileTransfer.download(url, zipFilePath).then(
        (entry) => {
          const localUrl = entry.toURL();
          // Unzip into the story folder
          this.zip
            .unzip(localUrl, targetFolderForZip, (progressEvent) => {
              // Display unpacking progress
              this.updateLoadingContent(
                this.unpackingProgressStr(
                  story.title,
                  progressEvent.loaded,
                  progressEvent.total
                ),
                loading
              );
            })
            .then((result) => {
              if (result === 0) {
                this.file
                  .removeFile(targetFolderForZip, zipFileName)
                  .then((removeRes) => {
                    this.storyService.addStory(story);
                    loading.dismiss();
                    this.alertStoryAddedSuccessfully(story.title);
                  })
                  .catch((error) => {
                    loading.dismiss();
                    this.toastService.displayToast(
                      this.translate.instant("STORY_ZIP_REMOVE_FAIL")
                    );
                    console.log("Could not remove downloaded Zip!"); //TODO: Konstante(n) erstellen
                  });
              } else if (result === -1) {
                console.log("Unzipping the file failed!");
                this.toastService.displayToast(
                  this.translate.instant("STORY_ZIP_UNPACK_FAIL")
                );
              }
            });
        },
        (error) => {
          loading.dismiss();
          this.toastService.displayToast(
            this.translate.instant("STORY_DOWNLOAD_FAIL")
          );
          console.error(
            "Could not download the file: " + url + " to path: " + zipFilePath
          );
          console.error(JSON.stringify(error));
        }
      );
    }
  }

  /**
   * Alert for already existing story
   * @param storyTitle title of the story
   */
  private async alertStoryAlreadyExists(storyTitle: string) {
    // story already exists --> display a message and return
    const al = await this.alert.createAlert(
      this.translate.instant("STORY_ALREADY_EXISTS_TITLE"),
      "",
      [{ text: this.translate.instant("COMMON_OK") }],
      this.translate.instant("STORY_ALREADY_EXISTS_MSG", {
        story_title: storyTitle,
      })
    );
    await al.present();
  }

  /**
   * Alert for successful installation of a story
   * @param storyTitle title of the new story
   */
  private async alertStoryAddedSuccessfully(storyTitle: string) {
    const al = await this.alert.createAlert(
      this.translate.instant("STORY_ADDED"),
      "",
      [{ text: this.translate.instant("COMMON_OK") }],
      this.translate.instant("STORY_ADDED_MSG", { story_title: storyTitle })
    );
    await al.present();
  }
}
