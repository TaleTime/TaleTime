import {TTS_RATE_NORMAL_VALUE} from "../constants/constants";

/**
 * Created by Kevin on 30.06.2017.
 * Datamodel for all settings available to control the general behavior of the app
 */

export class Settings {
    public autoPlay = true;
    public language = "de-DE";
    public speechRecognition = false;
    public interaction = false;
    public ttsRate: number = TTS_RATE_NORMAL_VALUE;

    // TODO font size needs to be added
}
