/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-19
 */
import { UserProfile } from "./userProfile";

export class UserAccount {
  public name: string;
  public email: string;
  public pin: any;

  public userProfiles: Map<string, UserProfile>;
  public activeUserProfile: UserProfile;

  constructor(name: string, email: string, pin: any, userProfiles?: Map<string, UserProfile>) {
    this.name = name;
    this.email = email;
    this.pin = pin;
    this.userProfiles = userProfiles || new Map<string, UserProfile>();
  }

  // set pin(pin: any) {
  //   this._pin = pin; // TODO hash
  // }
  //
  // get pin() {
  //   return this._pin;
  // }

  public checkPin(pin: any) {
    return (pin === this.pin);
  }

  public addUserProfile(userProfile: UserProfile) {
    this.userProfiles.set(userProfile.id, userProfile);
  }

  public removeUserProfile(userProfileId: string) {
    this.userProfiles.delete(userProfileId);
  }

  public setActiveUserProfile(userProfileId) {
    this.activeUserProfile = this.userProfiles.get(userProfileId);
  }

  public isValid(pin: any): boolean {
    return (this.pin === pin);
  }

}
