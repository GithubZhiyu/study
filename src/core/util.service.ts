import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Injectable()
export class UtilService {
    constructor(
        private toastCtrl: ToastController,
    ) { }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2 * 1000,
            position: 'top'
        });
        toast.present();
    }
}