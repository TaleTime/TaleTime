import {Injectable} from "@angular/core";
import {Media, MediaObject} from "@ionic-native/media/ngx";
import {EventEmitter} from "events";
import {LoggerService} from "./logger.service";

/**
 * @author Markus Altmeyer
 */

@Injectable({
  providedIn: "root"
})
export class AudioService {
  private mediaObject: MediaObject;
  private emitter: EventEmitter;
  private isPlaying = false;

  constructor(private media: Media, private logger: LoggerService) {
  }

  /**
   * Loads an audio file. After this the file can be played, stopped etc
   * @param audioPath Pfad zur Audiodatei
   * @param audioFinishedCallback  Gets called when the audio file finishes playing. This is true if auido finishes playing or when stop
   *        is called while audio is playing
   * @param errorCallback Gets called when an error occures.
   */
  loadAudio(audioPath: string, audioFinishedCallback?, errorCallback?) {
    this.mediaObject = this.media.create(audioPath);
    this.emitter = new EventEmitter();
    // Subscribe for events
    this.mediaObject.onStatusUpdate.subscribe((status) => {
      switch (status) {
        case this.media.MEDIA_STARTING:
          this.logger.log("[Media] Started");
          // this.emitter.emit("started");
          break;
        case this.media.MEDIA_RUNNING:
          this.logger.log("[Media] Running");
          this.emitter.emit("started");
          break;
        case this.media.MEDIA_PAUSED:
          this.logger.log("[Media] Paused");
          this.emitter.emit("paused");
          break;
        case this.media.MEDIA_STOPPED:
          this.logger.log("[Media] Stopped");
          this.emitter.emit("stopped");
          break;
      }
    });

    // Gets called when audio finishes playing. Could be either when the file finishes, or when stop gets called while audio was playing
    this.mediaObject.onSuccess.subscribe(() => {
      this.logger.log("[Media] Audio finished");

      this.isPlaying = false;

      // file finishes playing or was stopped
      if (audioFinishedCallback) {
        audioFinishedCallback();
      }
    });

    // Error could be an error while loading the audio file
    // Error code: https://github.com/apache/cordova-plugin-media#constants-1
    this.mediaObject.onError.subscribe((error) => {
      this.logger.log(error);
      this.isPlaying = false;
      if (errorCallback) {
        errorCallback(error);
      }
    });
  }

  /**
   * Starts playing or resuming an audio file
   */
  play(): Promise<any> {
    return new Promise((resolve) => {
      if (!this.isPlaying) {
        this.isPlaying = true;
        this.emitter.once("started", () => {
          resolve();
        });
        this.mediaObject.play();
      } else {
        resolve();
      }
    });
  }

  /**
   * Pauses an audio file if playing
   */
  pause(): Promise<any> {
    return new Promise((resolve) => {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.emitter.once("paused", () => {
          resolve();
        });
        this.mediaObject.pause();
      } else {
        resolve();
      }
    });
  }

  /**
   * Stops an Audio file if playing
   */
  stop(): Promise<any> {
    return new Promise((resolve) => {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.emitter.once("stopped", () => {
          resolve();
        });
        this.mediaObject.stop();
      } else {
        resolve();
      }
    });
  }
}
