import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";
import {WWW} from "../../constants/constants";
import {File} from "@ionic-native/file/ngx";

@Injectable({
  providedIn: "root"
})
export class PlatformBridgeService {

  constructor(private platform: Platform, private file: File) {
  }

  /**
   * Tells if the app runs in a browser (mobile or desktop)
   */
  public platformIsBrowser(): boolean {
    return this.platform.is("desktop") || this.platform.is("mobileweb");
  }

  /**
   * Tells if the app runs natively
   */
  public platformIsNative(): boolean {
    return !this.platformIsBrowser();
  }

  /**
   * Get the base app path where e.g. the asset folder is located
   */
  public getAppDirectory(): string {
    if (this.platformIsBrowser()) {
      // Browser needs the relative path
      return "";
    } else {
      // Native platforms need an absolute path
      return this.file.applicationDirectory + WWW + "/";
    }
  }
}
