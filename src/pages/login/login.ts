import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';


import { User } from './../../models/user.model';
import {HomePage} from './../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, public loadingCtrl: LoadingController) {
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  googleLogin(){
      console.log("on login method")
      this.goToHomePage();
  }

    goToHomePage(){
      this.navCtrl.setRoot(HomePage, {
        user: this.user
      });

  }


}
