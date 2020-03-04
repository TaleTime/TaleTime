import { Injectable } from "@angular/core";
import {Settings} from "../../app/models/settings";
import {UserAccount} from "../../app/models/userAccount";
import {UserProfile} from "../../app/models/userProfile";
import {throwError as observableThrowError} from "rxjs/internal/observable/throwError";
import {Observable} from "rxjs";
import {AlertController, NavController} from "@ionic/angular";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app/app-routing.module";
import {Storage} from "@ionic/storage";
import {SettingsService} from "../../app/services/settings/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../app/services/auth/auth.service";
import {SimpleToastService} from "../../app/services/simple-toast/simple-toast.service";
import {AppComponent} from "../../app/app.component";

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

  public register(credentials: { name: any; email: any; pin: any }) {
    if (
      credentials.email === null ||
      credentials.name === null ||
      credentials.pin === null
    ) {
      return observableThrowError("Please insert credentials");
    } else {
      const userAccount = new UserAccount(credentials.name, credentials.email);
      userAccount.updatePin(credentials.pin); // Set pin seperately to hash it
      this._currentUser = userAccount;

      return new Observable((subscriber: { next: (arg0: boolean) => void; complete: () => void }) => {
        subscriber.next(true);
        subscriber.complete();
      })
    }
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

