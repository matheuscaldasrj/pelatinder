import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService{

message: string;
duration: number;

constructor(private toastCtrl: ToastController) {
    
}

presentToast(message: string, duration?: number) {

  if(!this.duration){
      this.duration = 3000;
  }

  let toast = this.toastCtrl.create({
    message: this.message,
    duration: this.duration,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast -> ' + message);
  });

  toast.present();
}


}