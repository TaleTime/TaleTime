import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the SimpleToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SimpleToastProvider {

  constructor(private toastCtrl: ToastController, private translate : TranslateService) {
  }

  public displayToast(message: string, duration = 3000, displayOkBtn = false, dismissHandler : (() => void) = null) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: displayOkBtn,
      duration: duration,
      closeButtonText: this.translate.instant('COMMON_OK')
    });
    if (dismissHandler != null) {
      toast.onDidDismiss(dismissHandler);
    }
    toast.present();
}
}
