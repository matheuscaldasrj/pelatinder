import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';

import {HomePage} from './../home/home';

import { CreateAccountPage } from './../create-account/create-account';
import { LoginEmailPage } from './../login-email/login-email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              db: AngularFireDatabase,
              private authService: AuthService,
              private toastCtrl: ToastController) {
  }

  signInWithFacebook(): void {

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: "bottom"
    });

   

    this.authService.signinWithFacebook()
    .then(() =>  {
      toast.setMessage("Login efetuado com sucesso!");
      toast.present();
      this.goToHomePage();
    })
    .catch( (e)=>{
      console.error(e);
      toast.setMessage("Ocorreu um erro ao tentar logar");
      toast.present();
    });
  }

  signInWithEmail() : void {
    this.navCtrl.push(LoginEmailPage);
  }

   goToHomePage(){ 
      this.navCtrl.setRoot(HomePage);
   }

   goToCreateAccount(){
      this.navCtrl.push(CreateAccountPage);
   }
}
