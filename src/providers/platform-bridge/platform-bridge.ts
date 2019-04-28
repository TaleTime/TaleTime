import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';
import { WWW } from '../../app/constants';
import { File } from '@ionic-native/file/ngx';

/*
  Generated class for the PlatformBridgeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
/**
 * Helper class to detect the current platform the app is running on
 * and for handling differences between them
 * @export
 * @class PlatformBridgeProvider
 */
@Injectable()

export class PlatformBridgeProvider {

  constructor(
    private platform: Platform,
    private file: File
  ) {}

  /**
   * Tells if the app runs in a browser (mobile or desktop)
   */
  public platformIsBrowser() : boolean {
    return (this.platform.is('core') || this.platform.is('mobileweb'));
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
      //Browser needs the relative path
      return '';
    } else {
      //Native platforms need an absolute path
      return this.file.applicationDirectory + WWW + "/";
    }
  }

}
