import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';

import {HomePage} from './../home/home';
import {ToastService} from './../../services/toast.service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              db: AngularFireDatabase,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  signInWithFacebook(): void {
    this.authService.signinWithFacebook()
    .then(() =>  {
      this.toastService.presentToast("Login efetuado com sucesso!");
      this.goToHomePage();
    })
    .catch( (e)=>{
       console.error(e);
       this.toastService.presentToast("Ocorreu um erro ao tentar logar");
    });
  }

   goToHomePage(){ 
      this.navCtrl.setRoot(HomePage, { });
   }
}
