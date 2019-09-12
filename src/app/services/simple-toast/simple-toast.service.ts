import {Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class SimpleToastService {

  constructor(
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
  }

  public async displayToast(
    message1: string,
    duration1 = 3000,
    displayOkBtn = false,
    dismissHandler: () => void = null
  ) {
    const toast = await this.toastCtrl.create({
      message: message1,
      showCloseButton: displayOkBtn,
      duration: duration1,
      closeButtonText: this.translate.instant("COMMON_OK")
    });
    if (dismissHandler != null) {
      toast.onDidDismiss().then(dismissHandler);  // TODO might not work
    }
    await toast.present();
  }
}
