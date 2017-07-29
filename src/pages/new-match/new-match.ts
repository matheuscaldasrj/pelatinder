import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { MatchRest } from './../../models/matchRest.model';

import { DatePicker } from '@ionic-native/date-picker';
import { User } from './../../models/user.model';
import { Match } from './../../models/match.model';

@IonicPage()
@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html',
})
export class NewMatchPage {

  name: string;
  local: string;
  date;
  numberOfPeople: number;
  user : User;
  match: Match;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebaseService: FirebaseService,
              public datePicker : DatePicker,
              private toastCtrl: ToastController) {

    this.date = new Date();
    this.user = this.navParams.get("user");
}


  createNewMatch() {    
    let match = new Match(this.name, this.date.getTime(), this.local, this.numberOfPeople, this.user.uid);
    
     let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
    });
    this.firebaseService.addMatch(match, this.user)
                      .then( () => { toast.setMessage("Pelada criada com sucesso!"); toast.present();})
                      .catch( (error) => {toast.setMessage("Houve um erro ao tentar criar a pelada"); toast.present();});

    this.navCtrl.pop();
  }

  openDatePicker(){
    this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }



}
