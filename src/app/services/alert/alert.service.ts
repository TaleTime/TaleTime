import {Injectable} from "@angular/core";
import {AlertController} from "@ionic/angular";
import {AlertButton} from "@ionic/core";

@Injectable({
  providedIn: "root"
})

export class AlertService {
  constructor(public alertCtrl: AlertController) {
  }

  createAlert(
    title: string,
    subTitle: string,
    buttons: AlertButton[],
    message?: string
  ) {
    return this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message,
      buttons
    });
  }

  createButton(text: string, handler: () => void) {
    return {
      text,
      handler
    };
  }
}
