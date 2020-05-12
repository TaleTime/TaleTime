/**
 *
 * @author Matthias Kiefer
 * @date 20.11.2017
 */
import {Settings} from "./settings";

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

  constructor(name: string, avatarId: number, child: boolean) {
    this.id = Math.random()
      .toString(36)
      .substr(2, 9);
    this.name = name;
    this.avatar = UserProfile.avatars(avatarId);
    this.child = child;
  }

  static avatars(id?): Array<object> | object {
    if (id !== undefined) {
      return UserProfile.AVATARS[id];
    } else {
      return UserProfile.AVATARS;
    }
  }
}
