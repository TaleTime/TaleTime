import { DEFAULT_READER } from "../app/constants";
export class Savegame {
    storyId: string; //or Story ID ? by now there is no big difference
    //chosenPath: Stack<number>;
    chosenPath: Array<number>;
    reader: string = DEFAULT_READER;
}
