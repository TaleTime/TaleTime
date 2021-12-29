import { Injectable } from "@angular/core";
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReviewServiceService {

  private storyIDSource = new BehaviorSubject<string>("default id");
  currentStoryId = this.storyIDSource.asObservable();

  private storyTitleSource = new BehaviorSubject<string>("default title");
  currentStoryTitle = this.storyTitleSource.asObservable();

  constructor() { }

  changeStoryId(storyId: string){
    this.storyIDSource.next(storyId);
  }

  changeStoryTitle(storyTitle: string){
    this.storyTitleSource.next(storyTitle);
  }
}
