import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  public storyID:string;
  public storyTitle:string;

  constructor() { }
}
