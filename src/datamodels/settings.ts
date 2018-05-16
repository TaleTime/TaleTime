import { TTS_RATE_NORMAL_VALUE } from "../app/constants";
/**
 * Created by Kevin on 30.06.2017.
 * Datamodel for all settings available to control the general behavior of the app
 */

export class Settings {

  public autoPlay: boolean = true;
  public language: string = 'de-DE';
  public speechRecognition: boolean = false;
  public interaction: boolean = false;
  public ttsRate: number = TTS_RATE_NORMAL_VALUE;

  // TODO font size needs to be added

}
