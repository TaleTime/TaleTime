import {DEFAULT_READER} from "../constants/constants";

export class SaveGame {
  storyId: string; // or Story ID ? by now there is no big difference
  // chosenPath: Stack<number>;
  chosenPath: Array<number>;
  reader: string = DEFAULT_READER;
}
