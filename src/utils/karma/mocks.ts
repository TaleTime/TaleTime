import { Injectable } from "@angular/core";
import {Settings} from "../../app/models/settings";
import {UserAccount} from "../../app/models/userAccount";
import {UserProfile} from "../../app/models/userProfile";


@Injectable()
export class MockedNavController{

}

@Injectable()
export class MockedStorage{

}

@Injectable()
export class MockedRouter{
  navigate(){

  }
}

@Injectable()
export class MockedSettingsService{
  private settings: Settings = new Settings();

  set autoPlay(value: boolean){
    this.settings.autoPlay = value
  }

  get autoPlay(): boolean{
    return this.settings.autoPlay
  }

  set language(value: string){
    this.settings.language = value
  }

  get language(): string{
    return this.settings.language
  }

  set speechRecognition(value: boolean){
    this.settings.speechRecognition = value
  }

  get speechRecognition(): boolean{
    return this.settings.speechRecognition
  }

  set interaction(value: boolean){
    this.settings.interaction = value
  }

  get interaction(): boolean{
    return this.settings.interaction
  }

  set ttsRate(value: number){
    this.settings.ttsRate = value
  }

  get ttsRate(): number{
    return this.settings.ttsRate
  }

  set fontSize(value: number){
    this.settings.fontSize = value
  }

  get fontSize(): number{
    return this.settings.fontSize
  }

}

@Injectable()
export class MockedTranslateService{
  use(lang){

  }
}

@Injectable()
export class MockedAuthService{
  private _currentUser: UserAccount;
  private _activeUserProfile : UserProfile;

  get currentUser(): UserAccount {
    return this._currentUser;
  }

  set currentUser(value: UserAccount) {
    this._currentUser = value;
  }

  get activeUserProfile(): UserProfile {
    return this._activeUserProfile;
  }

  set activeUserProfile(value: UserProfile) {
    this._activeUserProfile = value;
  }

  getActiveUserProfile(): UserProfile{
    return this.activeUserProfile
  }
}

@Injectable()
export class MockedToastService{

}
