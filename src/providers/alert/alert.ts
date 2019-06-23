import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import { AlertController } from "ionic-angular";
import { AlertButton } from "ionic-angular/components/alert/alert-options";
/*
Generated class for the AlertProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertProvider {
  constructor(public alertCtrl: AlertController) {}

  createAlert(
    title: string,
    subTitle: string,
    buttons: AlertButton[],
    message?: string
  ) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: buttons
    });
    return alert;
  }

  createButton(text: string, handler: () => void) {
    return {
      text: text,
      handler: handler
    };
  }
}
