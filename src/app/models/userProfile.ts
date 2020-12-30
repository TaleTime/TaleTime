/**
 *
 * @author Matthias Kiefer
 * @date 20.11.2017
 */
import {Settings} from "./settings";
import {StoryInformation} from "./storyInformation";
import {SaveGame} from "./saveGame";
import {AvailableLanguage} from "./AvailableLanguage";
import {throwError as observableThrowError} from "rxjs/internal/observable/throwError";

export class UserProfile {
  private static AVATARS = [
    {
      id: 0,
      name: "profile_standard.png",
      fullPath: "/www/assets/imgs/profile/profile_standard.png"
    },
    {
      id: 1,
      name: "profile_girl_01.png",
      fullPath: "/www/assets/imgs/profile/profile_girl_01.png"
    },
    {
      id: 2,
      name: "profile_boy_01.png",
      fullPath: "/www/assets/imgs/profile/profile_boy_01.png"
    },
    {
      id: 3,
      name: "profile_girl_02.png",
      fullPath: "/www/assets/imgs/profile/profile_girl_02.png"
    },
    {
      id: 4,
      name: "profile_boy_02.png",
      fullPath: "/www/assets/imgs/profile/profile_boy_02.png"
    }
  ];

  public id: string;
  public name: string;
  public avatar;
  public child: boolean;
  public settings: Settings;
  private arrayOfStories: Array<StoryInformation>;
  private arrayOfSaveGames: Array<SaveGame>;

  constructor(name: string, avatarId: number, child: boolean) {
    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.name = name;
    this.avatar = UserProfile.avatars(avatarId);
    this.child = child;
    this.arrayOfStories = [];
  }

  public getArrayOfStories():Array<StoryInformation>{
    return this.arrayOfStories;
  }
  /**
   * Returns an array of type Array<StoryInformation> for a given language
   * @param {AvailableLanguage} lang Language as enum
   * @returns {Array<StoryInformation>}
   */
  public getArrayOfStoriesByLanguage(lang: AvailableLanguage):Array<StoryInformation>{
    return this.arrayOfStories.filter(o=> o.language===lang)

  }

  public addStory(story: StoryInformation):void{
    this.arrayOfStories.push(story);
  }

  public getSaveGame(findStoryId:string):SaveGame{
    this.arrayOfSaveGames.find(o => {
      if(o.storyId===findStoryId) {
        return o;
      }
    })
    throw Error("Object not found");
  }
  public setSaveGame(savegame: SaveGame):void{
    this.arrayOfSaveGames.push(savegame);
  }
  /**
   * Checks if a storie was already added.
   * @param {String} title Title of the storie.
   * @returns {boolean} true if story already stored, otherwise false
   */
  public isStoryPresent(title:String):boolean{
    for (let story of this.arrayOfStories){
      if(story.id === title){
        return true;
      }
    }
    return false;
  }




  static avatars(id?): Array<object> | object {
    if (id !== undefined) {
      return UserProfile.AVATARS[id];
    } else {
      return UserProfile.AVATARS;
    }
  }
}
