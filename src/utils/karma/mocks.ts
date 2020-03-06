import { Injectable } from "@angular/core";
import {Settings} from "../../app/models/settings";
import {UserAccount} from "../../app/models/userAccount";
import {UserProfile} from "../../app/models/userProfile";
import {throwError as observableThrowError} from "rxjs/internal/observable/throwError";
import {Observable} from "rxjs";

@Injectable()
export class MockedNavController{

}

@Injectable()
export class MockedStorage{
  public map = new Map()

  public ready(): Promise<any>{
    let promise = new Promise(() => {

    });
    return promise
  }

  set(key: string, value: any): Promise<any>{
    this.map.set(key, value)
    let promise = new Promise((resolve, reject) => {

    });
    return promise;
  }

  get(key: string): Promise<any>{
    let promise = new Promise((result) => {
        result = this.map.get(key)
    });
    return promise;
  }
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

  public ready(): Promise<any>{
    let promise = new Promise((resolve, reject) => {

    });
    return promise
  }

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

  public register(credentials: { name: any; email: any; pin: any }) {
    if (
      credentials.email === null ||
      credentials.name === null ||
      credentials.pin === null
    ) {
      return observableThrowError("Please insert credentials");
    } else {
      const userAccount = new UserAccount(credentials.name, credentials.email, "12312jjkhkhkj");
      userAccount.updatePin(credentials.pin); // Set pin seperately to hash it
      this._currentUser = userAccount;

      return new Observable((subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      })
    }
  }

  public createUserProfile(credentials: {
    name: any;
    avatarId: any;
    child: any;
  }) {
      this.activeUserProfile = new UserProfile(credentials.name, credentials.avatarId, credentials.child);

      return new Observable((subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
          subscriber.next(true);
          subscriber.complete();
      })
    }
}

@Injectable()
export class MockedToastService{

}

@Injectable()
export class MockedAlertController{

}

@Injectable()
export class MockedLoadingController{

}

@Injectable()
export class MockedAppComponent{

}

@Injectable()
export class MockedPlatform{
  public ready(): Promise<any>{
    let promise = new Promise(() => {

    });
    return promise
  }
}

@Injectable()
export class MockedFile{

}

@Injectable()
export class MockedLanguageFileService{

}

@Injectable()
export class MockedSpeechRecognitionService{

}

@Injectable()
export class MockedAlertService{

}





