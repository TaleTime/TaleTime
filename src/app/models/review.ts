import { Injectable } from "@angular/core";
@Injectable()
export class Review {

  public author: string;
  public comment: string;
  public date: string;
  public rating: number;
  public storyId: number;
  public storyTitle: string;
}

