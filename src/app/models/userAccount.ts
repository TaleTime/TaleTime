/**
 *
 * @author Matthias Kiefer
 * @date 2017-11-19
 */
import {UserProfile} from "./userProfile";
import {sha256} from "js-sha256";

export class UserAccount {
  public name: string;
  public email: string;
  public hash: string;

  public userProfiles: Map<string, UserProfile>;
  public activeUserProfile: UserProfile;

  constructor(
    name: string,
    email: string,
    hash?: string,
    userProfiles?: Map<string, UserProfile>
  ) {
    this.name = name;
    this.email = email;
    this.hash = hash || "";
    this.userProfiles = userProfiles || new Map<string, UserProfile>();
  }

  public updatePin(pin: string) {
    this.hash = sha256(pin);
  }

  public checkPin(pin: string) {
    return sha256(pin) === this.hash;
  }

  public checkCredentials(email: string, pin: string) {
    return this.email === email && this.hash === sha256(pin);
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
}
