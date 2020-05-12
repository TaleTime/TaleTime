import {Injectable} from '@angular/core';
import {StoryInformation} from "../../models/storyInformation";

@Injectable({
  providedIn: 'root'
})
export class StoryInformationService {
  private _storyInformation: StoryInformation;

  constructor(storyInformation: StoryInformation) {
    this._storyInformation = storyInformation;
  }

  get storyInformation(): StoryInformation {
    return this._storyInformation;
  }

  set storyInformation(value: StoryInformation) {
    this._storyInformation = value;
  }
}
