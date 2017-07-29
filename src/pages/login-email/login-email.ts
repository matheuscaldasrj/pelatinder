import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { NewUser } from './../../models/newUser.model';
import { AuthService } from './../../providers/auth-service/auth-service';


@Component({
  selector: 'page-login-email',
  templateUrl: 'login-email.html',
})
export class LoginEmailPage {

   user: NewUser = new NewUser();

    constructor(public navCtrl: NavController, public navParams: NavParams, private authService : AuthService, private toastCtrl : ToastController) {
  }

  logIn() {

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
    });

    this.authService.createUser(this.user)
      .then((user: any) => {
        toast.setMessage("Logado com sucesso");
        toast.present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error: Error) => {

        toast.setMessage("Ocorreu um erro : " + error.message);
        toast.present();
      })
  }

}
