import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Platform} from "@ionic/angular";
import {AlertService} from "./alert.service";
import {LanguageFileService} from "./speech-recognition/language-file.service";
import {LoggerService} from "./logger.service";
import {Settings} from "../models/settings";
import {SpeechRecognition} from "@ionic-native/speech-recognition/ngx";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  private readonly SETTINGS_KEY = "SETTINGS";
  private settings: Settings;

  private languageSubject: Subject<string> = new Subject();
  private settingsLoaded: Subject<boolean> = new Subject();

  constructor(
    private platform: Platform,
    private languageFile: LanguageFileService,
    private storage: Storage,
    private speechRecognitionService: SpeechRecognition,
    private logger: LoggerService,
    private alert: AlertService
  ) {
    this.platform.ready().then(() => {
      this.storage.ready().then(() => {
        this.loadSettings();
      });
    });

  }

  loadSettings() {
    this.storage
      .get(this.SETTINGS_KEY)
      .then((settings: Settings) => {
        this.logger.log(
          "Read settings from storage: " + JSON.stringify(settings)
        );
        this.settings = settings;
        this.reloadLanguageFile();
        this.settingsLoaded.next(true);
      })
      .catch((error) => {
        this.logger.log(error.message);
        this.settings = new Settings();
        this.save();
        this.settingsLoaded.next(true);
      });
  }

  get autoPlay(): boolean {
    return this.settings.autoPlay;
  }

  set autoPlay(value: boolean) {
    this.settings.autoPlay = value;
    this.save();
  }

  get language(): string {
    return this.settings.language;
  }

  set language(value: string) {
    this.settings.language = value;
    this.reloadLanguageFile();
    this.save();
  }

  get speechRecognition(): boolean {
    return this.settings.speechRecognition;
  }

  set speechRecognition(value: boolean) {
    // make sure the user gave the permission to use the microphone
    if (value) {
      this.speechRecognitionService.hasPermission().then(
        (hasPermission: boolean) => {
          if (hasPermission) {
            this.updateAndSaveSpeechRecognitionValue(value);
          } else {
            this.speechRecognitionService.requestPermission().then(
              () => this.updateAndSaveSpeechRecognitionValue(value),
              async () => {  // TODO might not work, async / await problematic ?
                const alert = await this.alert
                  .createAlert(
                    "Error",
                    "Permission needed to use Speech Recognition",
                    [{text: "OK"}]
                  );
                await alert.present();
                this.updateAndSaveSpeechRecognitionValue(false);
              }
            );
          }
        },
        () => this.updateAndSaveSpeechRecognitionValue(false)
      );
    } else {
      this.updateAndSaveSpeechRecognitionValue(value);
    }
  }

  private updateAndSaveSpeechRecognitionValue(value: boolean): void {
    this.logger.log("Speech rec set to " + value);
    this.settings.speechRecognition = value;
    this.save();
  }

  get interaction(): boolean {
    return this.settings.interaction;
  }

  set interaction(value: boolean) {
    this.settings.interaction = value;
    this.save();
  }

  get ttsRate(): number {
    return this.settings.ttsRate;
  }

  set ttsRate(value: number) {
    this.settings.ttsRate = value;
    this.save();
  }

  public onLanguageChanged(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  public onSettingsLoaded(): Observable<boolean> {
    return this.settingsLoaded.asObservable();
  }

  private reloadLanguageFile() {
    this.languageFile.loadLanguageFile(this.settings.language).subscribe(() => {
      this.logger.log("Language file reloaded for " + this.settings.language);
      this.languageSubject.next(this.settings.language);
    });
  }

  /**
   * Save all the settings to ionic storage
   */
  private save() {
    this.storage
      .set(this.SETTINGS_KEY, this.settings)
      .then(() =>
        this.logger.log("Settings written: " + JSON.stringify(this.settings))
      )
      .catch((err) => {
        this.logger.error("Could not save setting file!");
        this.logger.error(err);
      });
  }

  public getShortLangCode() {
    return this.language.substring(0, this.language.indexOf("-"));
  }
}
