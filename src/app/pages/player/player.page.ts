import { ApplicationRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
/** Plugins */
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
import { TextToSpeech } from "@ionic-native/text-to-speech/ngx";
import { NavController, Platform } from "@ionic/angular";
import { FireBaseService } from "src/app/services/firebase/firebaseService";
import {
  ANSWER_CHAPTER_BACKWARDS,
  ANSWER_CHAPTER_REPEAT,
  CSS_PULSE_CLASS,
  DEFAULT_READER,
  FILETYPE_MP4,
  READER_DIR,
  STORY_DIR,
} from "../../constants/constants";
import { SaveGame } from "../../models/saveGame";
/** Datamodels & Constants */
import {
  ChapterAttributes,
  MtgaNextStoryNode,
  StoryMetaData,
} from "../../models/story/story";
import { AudioService } from "../../services/audio/audio.service";
import { AuthService } from "../../services/auth/auth.service";
import { PlatformBridgeService } from "../../services/platform-bridge/platform-bridge.service";
import { PlayerParamsService } from "../../services/player-parmas/player-params.service";
import { PublicStoryHelperService } from "../../services/public-story-helper/public-story-helper.service";
import { SaveGameService } from "../../services/save-game/save-game.service";
import { SettingsService } from "../../services/settings/settings.service";
import { AnswerMatchingService } from "../../services/speech-recognition/answer-matching/answer-matching.service";
import { TtsTextService } from "../../services/speech-recognition/tts-text/tts-text.service";
/** Service */
import { StoryService } from "../../services/story/story.service";
import { StoryMenuPage } from "../story-menu/story-menu.page";

// import Stack from "ts-data.stack";
/**
 * @author Janis Schacht
 * @author Kevin Münch
 * @author Markus Altmeyer
 * player.ts contains the logic that is necessary to play stories
 */

const BEGIN = "begin";
const CONTINUE = "continue";
const FIRST_NODE = 1;

const routes: Routes = [{ path: "storyMenu", component: StoryMenuPage }];

@Component({
  selector: "app-player",
  templateUrl: "./player.page.html",
  styleUrls: ["./player.page.scss"],
})
export class PlayerPage implements OnInit {
  public playing = false;
  private selectedReader: string;

  // True, if reader is DEFAULT_READER. Use tts and don't try to load audio file
  private usingTTS: boolean;
  // if an audio file is not available, audio changes to tts for this audiofile
  private temporaryTTS = false;

  public metadata: StoryMetaData = new StoryMetaData();
  public answers: MtgaNextStoryNode[];
  public text: string;
  private attr: ChapterAttributes;
  private storyId: string;
  private mode: string;
  private saveGame: SaveGame;
  public pulseClass: string;
  private stopped: boolean;
  //must be public for the aot compilation
  public fontSizePx: string;

  //
  public disabled = false;

  // While tts is reading answers out or while speechrecognition is listening, block playPause-Button
  private isPlayPauseBlocked = false;

  constructor(
    public navCtrl: NavController,
    public playerParamsService: PlayerParamsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private saveGameService: SaveGameService,
    private audioService: AudioService,
    private platform: Platform,
    private story: StoryService,
    private appRef: ApplicationRef,
    private speechRecognition: SpeechRecognition,
    private ttsTexts: TtsTextService,
    private tts: TextToSpeech,
    private matching: AnswerMatchingService,
    private settings: SettingsService,
    private publicStoryHelper: PublicStoryHelperService,
    private platformBridge: PlatformBridgeService,
    private firebaseService: FireBaseService
  ) {
    // if(this.authService.currentUserAccount == null){
    //   this.router.navigate(["/start"]);
    // }
    this.fontSizePx = this.settings.fontSize.toString() + "px";
    this.platform.ready().then(() => {
      console.log("PlayerPage started");
      this.storyId = this.playerParamsService.getPlayerParams().storyId;

      this.loadSaveGame();

      // DEFAULT_READER if new savegame
      // this.selectedReader = this.saveGame.reader;
      // this.selectedReader = DEFAULT_READER;
      if (this.playerParamsService.getPlayerParams().reader === "") {
        this.selectedReader = this.saveGame.reader;
      } else {
        this.selectedReader = this.playerParamsService.getPlayerParams().reader;
      }
      this.mode = this.playerParamsService.getPlayerParams().mode; // differentiate between starting story over or continuing from savegame
      console.log("storyId:" + this.storyId);
      console.log("reader:" + this.selectedReader);
      console.log("mode: " + this.mode);
      this.attr = new ChapterAttributes();
      // this.saveGame = new SaveGame();

      if (this.selectedReader === DEFAULT_READER) {
        this.usingTTS = true;
        console.log("using tts");
      } else {
        this.usingTTS = false;
      }
      if (
        settings.speechRecognition &&
        !this.platformBridge.platformIsBrowser()
      ) {
        this.speechRecognition
          .requestPermission()
          .then(() => (settings.speechRecognition = true))
          .catch(() => (settings.speechRecognition = false));
      }

      this.loadStory(this.storyId);
    });
  }

  ngOnInit() {}

  /**
   * Go back to Home Screen
   */
  goBackToHomeScreen() {
    this.ionViewWillLeave();
    this.ngOnDestroy();
    this.updateSaveGame();
    this.router.navigate(["tabs/story-menu"]);
  }

  ionViewWillLeave() {
    // This is triggered when another screen is loaded
    console.log("Player leaved, stop audio");
    this.pause();

    if (!this.platformBridge.platformIsBrowser()) {
      // If speechRecogniton is listening, stop it
      this.speechRecognition.stopListening();
      // If tts is reading answers out, stop it
      this.tts.speak(" ");
    }
  }

  ngOnDestroy(): void {
    console.log("Destroy Player");
    this.audioService.stop();
  }

  onBackKeyDown() {
    this.navCtrl.navigateForward("/settings", {});
  }

  /**
   * Toggles play / pause
   */
  public playPause() {
    console.log("Click on Play/Pause");
    if (this.isPlayPauseBlocked) {
      console.log("playPause ist blocked, do not play");
      return;
    }
    if (this.playing === false) {
      console.log("Audio is not running, start it");
      this.play();
    } else {
      console.log("Audio is currently running, pause it now");
      this.pause();
    }
  }

  /**
   * Loads the next chapter
   * @param answer id of the answer
   */
  nextChapter(answer: number) {
    if (this.answers[0].attributes.id === "-1") {
      this.navCtrl.navigateBack("tabs/story-menu");
    } else {
      this.loadNodeFromAnswer(answer);
      this.updateSaveGame();
    }
  }

  /**
   *  switches current node to previous node
   */
  previousChapter() {
    console.log("Current Node: " + this.attr.storyNodeId);
    const peekObject =
      this.saveGame.chosenPath[this.saveGame.chosenPath.length - 1];
    if (peekObject !== 1) {
      this.pause().then(() => {
        this.saveGame.chosenPath.length = this.saveGame.chosenPath.length - 1;
        this.loadNode();
        this.updateSaveGame();
      });
    }
  }

  /**
   * Get the full path for an audiofile, either on internal storage or sd card
   * @param audioSrc Name of audiofile
   */
  getAudioPath(audioSrc: string): string {
    const story = this.story.getStoryInformation(this.storyId);
    let audioPath = "";
    if (story.medium === "cloud") {
      audioPath = this.publicStoryHelper.getAudioPathForStory(
        story,
        audioSrc,
        this.selectedReader
      );
    } else {
      audioPath = this.platformBridge.getAppDirectory();
      audioPath +=
        STORY_DIR +
        story.folder +
        "/" +
        this.settings.getShortLangCode() +
        READER_DIR +
        this.selectedReader +
        "/" +
        audioSrc +
        FILETYPE_MP4;
    }
    return audioPath;
  }

  /**
   * Starts playing the audio output
   * depends on whether tts or real audio file is used
   */
  private play(): Promise<any> {
    return new Promise<void>((resolve) => {
      this.stopped = false;
      if (this.usingTTS || this.temporaryTTS) {
        if (!this.platformBridge.platformIsBrowser()) {
          console.log("Playing the following text: " + this.text);
          this.tts
            .speak({
              text: this.text,
              locale: this.settings.language,
              rate: this.settings.ttsRate,
            })
            .then(() => {
              this.playing = false;
              this.temporaryTTS = false;
              this.readAnswersOut(0);
            })
            .catch((error) => {
              // TODO: Hier wurde ein error 'UNKNOW_ERROR' geworfen, manchmal ging es manchmal nicht
              // Bei Geschichte der verlorene Ball -> Knoten id  3
              console.log("TTS error, play()", JSON.stringify(error));
            });
          this.playing = true;
          this.appRef.tick();
        }
        resolve();
      } else {
        this.audioService.play().then(() => {
          this.playing = true;
          this.appRef.tick();
          resolve();
        });
      }
    });
  }

  /**
   * pauses the audio output
   */
  private pause() {
    console.log("Pressed pause");
    return new Promise<void>((resolve) => {
      if (this.usingTTS || this.temporaryTTS) {
        if (!this.platformBridge.platformIsBrowser()) {
          // text has to be whitespace to work correct for some tts versions, not empty string
          this.tts.speak(" ").then(
            () => {
              console.log("Stop successful ");
              this.playing = false;
              this.stopped = true;
              resolve();
            },
            (e) => {
              console.log("TTS error, pause()", JSON.stringify(e));
            }
          );
        } else {
          resolve();
        }
      } else {
        this.audioService.pause().then(() => {
          this.playing = false;
          this.stopped = true;
          resolve();
        });
      }
    });
  }

  /**
   * Tells the story Service to load a story.
   * Calls  @method loadSavegame to load savegame for active user
   * @param name of the story
   */
  private loadStory(name: string) {
    this.story.loadStory(name).subscribe(() => {
      this.metadata = this.story.getStoryAttributes();
      // this.loadSaveGame();
      if (this.mode === BEGIN) {
        console.log("Start story from beginning, delete old progress");
        // this.saveGame.chosenPath = new Stack<number>();
        this.saveGame.chosenPath = [];
        this.saveGame.chosenPath.push(FIRST_NODE);
      } else if (this.mode === CONTINUE) {
      }
      this.loadNode();
      console.log("Story loaded");
    });
  }

  /**
   * loads savegame for active user
   * if no savegame exists for that user a new one will be created
   */
  private loadSaveGame() {
    this.saveGame = this.saveGameService.loadSavegame(this.storyId);

    console.log("Current savegame:");
    console.log(JSON.stringify(this.saveGame));
    // Check if Savegame exists or if a new one has to be created
    console.log("Savegame geladen ? " + this.saveGame.storyId);
    if (this.saveGame.chosenPath.length === 0) {
      console.log("No existing Savegame!");
      console.log("Creating a new on!");
      this.createNewSaveGame();
    }
  }

  private createNewSaveGame() {
    this.saveGame.storyId = this.storyId;
    this.saveGame.chosenPath.push(FIRST_NODE);

    this.saveGameService.addSavegame(this.saveGame);
    //TODO Uncomment if accounts are functional
    //this.saveGameService.addSavegame(this.saveGame);
  }

  /**
   * Updates Savegame, so that Users progress in Story is written to the Users File
   */
  private updateSaveGame() {
    this.saveGameService.updateSavegame(this.saveGame);
    console.log("Savegame successfully updated!");
    console.log(JSON.stringify(this.saveGame));
  }

  /**
   * Updates the fields from the story Service
   */
  private updateFields() {
    this.answers = this.story.getAnswers();
    this.checkAnswers();
    this.text = this.story.getText();
    this.attr = this.story.getChapterAtrributes();

    // disable back button on the first page of a story
    if (this.attr.storyNodeId == "1") {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  /**
   * check if there are answers for current node
   * if not, create an artificial one that will lead back to the story menu page
   */
  private checkAnswers() {
    if (this.answers[0].value == null) {
      this.answers[0].attributes.id = "-1";
      this.answers[0].value = "Back to the menu";
    }
  }

  /**
   * loads Node which is in top of the savegame stack
   * necessary for backwards navigation and loading from Savegame
   * calls @method loadAudioForNode which loads the audio for the loaded node
   */
  private loadNode() {
    // console.log("chosenPath[]: " + this.savegame.chosenPath.peek());
    // this.story.loadNode(this.savegame.chosenPath.peek() - 1);
    const peekObject =
      this.saveGame.chosenPath[this.saveGame.chosenPath.length - 1];
    console.log("chosenPath[]: " + peekObject);
    this.story.loadNode(peekObject - 1);

    this.updateFields();
    this.stopped = false;
    this.appRef.tick();

    // Check if tts or audio is used
    if (!this.usingTTS) {
      this.setupAudioForNode();
    }
    if (this.settings.autoPlay) {
      this.play();
    }
  }

  /**
   * Set up the audio for the current Node
   */
  private setupAudioForNode() {
    console.log("setupAudioForNode");

    // Change back to audio if there was temporary tts
    this.temporaryTTS = false;

    const nodeAudioFileName = this.story.getCurrentAudioSrc();
    const audioPath = this.getAudioPath(nodeAudioFileName);
    console.log("Audio-Path:", audioPath);
    this.audioService.loadAudio(
      audioPath,
      () => {
        console.log("Audio finished");
        this.playing = false;
        // Angular does not detect the change
        this.appRef.tick();
        this.readAnswersOut(0);
      },
      (error) => {
        console.log("Audio player Error:");
        console.log(JSON.stringify(error));
        console.log("Audiofile nicht verfügbar, verwende tts");
        // this.usingTTS = true;
        this.temporaryTTS = true;
        if (this.settings.autoPlay) {
          this.play();
        }
      }
    );
  }

  /**
   * Starts reading the answers out
   * @param counter how often was it read out
   */
  private readAnswersOut(counter: number = 0) {
    console.log("readAnswersOut");
    if (!this.stopped) {
      // if paused then the answers do not need to be read out
      // TODO we can use pre recorded audio files here as well to read out custom questions

      // only read answers out if this is not part of the audio file
      if (
        !this.usingTTS &&
        !this.temporaryTTS &&
        this.story.isCurrentSpeakerReadingAnswersOut()
      ) {
        if (this.settings.speechRecognition) {
          this.isPlayPauseBlocked = true;
          this.startSpeechRecognition(counter);
        }
      } else {
        // check if it is the last node
        if (this.answers[0].attributes.id !== "-1") {
          const readAnswer = this.ttsTexts.createAnswersText(this.answers);
          if (!this.platformBridge.platformIsBrowser()) {
            this.isPlayPauseBlocked = true;
            this.tts
              .speak({
                text: readAnswer,
                locale: this.settings.language,
                rate: this.settings.ttsRate,
              })
              .then(() => {
                if (this.settings.speechRecognition) {
                  this.startSpeechRecognition(counter);
                } else {
                  this.isPlayPauseBlocked = false;
                }
              })
              .catch((error) => {
                console.log(
                  "TTS error, readAnswersOut()",
                  JSON.stringify(error)
                );
              });
          }
        }
      }
    }
  }

  /**
   * Starts the speech recognition
   * @param counter how often was this already done
   */
  private startSpeechRecognition(counter: number) {
    this.speechRecognition.isRecognitionAvailable().then((available) => {
      if (available) {
        const options = {
          language: this.settings.language,
          showPopup: false,
        };

        this.speechRecognition.startListening(options).subscribe(
          (matches: string[]) => {
            // the magic
            console.log(matches);
            const answer = this.matching.match(matches, this.answers);
            console.log("Answer was " + JSON.stringify(answer));
            if (answer == null) {
              console.log("No match! Repeating!");
              this.repeatSpeechRecognition(counter);
            } else {
              this.isPlayPauseBlocked = false;
              console.log("Is answer a String?");
              console.log(typeof answer === "string");
              if (typeof answer === "string") {
                console.log(
                  "Answer was a special type and is instructed to do a command"
                );
                switch (answer) {
                  case ANSWER_CHAPTER_REPEAT:
                    console.log("Repeating chapter");
                    this.play();
                    break;
                  case ANSWER_CHAPTER_BACKWARDS:
                    console.log("Going to previous chapter");
                    this.previousChapter();
                    break;
                }
              } else {
                console.log("Matched " + answer.value + ". Going on!");
                const pos = this.findAnswerInList(answer);
                this.loadNodeFromAnswer(pos);
              }
            }
          },
          (err) => {
            console.log("There was an error while recording speech " + err);
            this.adviseUserToUseGUI();
          }
        );
      } else {
        console.log("Speech recognition not available!");
        this.isPlayPauseBlocked = false;
      }
    });
  }

  /**
   * Loads the next chapter from the index of an answer
   * @param pos index of the answer given by the user
   */
  private loadNodeFromAnswer(pos: number) {
    if (this.playing) {
      this.pause().then(() => {
        console.log("Paused. Loading next node for answer #" + pos);
      });
    }
    this.story.loadNodeForAnswer(pos);
    this.updateFields();
    this.saveGame.chosenPath.push(Number(this.attr.storyNodeId));
    this.pulseClass = "";
    this.appRef.tick();
    // Check if tts or audio is used
    if (!this.usingTTS) {
      this.setupAudioForNode();
    }
    if (this.settings.autoPlay) {
      this.play();
    }
  }

  /**
   * Starts the speech recognition again
   * @param counter how often was speech recognition used so far
   */
  private repeatSpeechRecognition(counter: number) {
    console.log("Repeating speech recognition for the " + counter + " time");
    if (counter < 1) {
      const repeatText = this.ttsTexts.createRepeatText();
      this.tts
        .speak({
          text: repeatText,
          locale: this.settings.language,
          rate: this.settings.ttsRate,
        })
        .then(() => {
          this.startSpeechRecognition(++counter);
        })
        .catch((error) => {
          console.log(
            "TTS error, repeatSpeechRecognition()",
            JSON.stringify(error)
          );
        });
    } else {
      if (counter < 2) {
        this.readAnswersOut(++counter);
      } else {
        // user should tap button
        this.adviseUserToUseGUI();
      }
    }
  }

  /**
   * User is advised to use GUI because there was a problem with the VUI
   */
  private adviseUserToUseGUI() {
    const endText = this.ttsTexts.createAnswerHelp();
    this.tts
      .speak({
        text: endText,
        locale: this.settings.language,
        rate: this.settings.ttsRate,
      })
      .then(() => {
        this.pulseClass = CSS_PULSE_CLASS;
        this.appRef.tick();
        this.isPlayPauseBlocked = false;
      })
      .catch((error) => {
        console.log("TTS error, adviseUserToUseGUI()", JSON.stringify(error));
      });
  }

  /**
   *    Finds the index of an answer
   * @param answer you're looking for
   * @returns index
   */
  private findAnswerInList(answer: MtgaNextStoryNode): number {
    let index = -1;
    for (let i = 0; i < this.answers.length; i++) {
      if (answer.value === this.answers[i].value) {
        index = i;
        break;
      }
    }
    return index;
  }
}
