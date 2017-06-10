import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';

import { DatePicker } from '@ionic-native/date-picker';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService, public datePicker : DatePicker) {
    this.date = new Date();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMatchPage');
  }


  createNewMatch() {
    console.log("lets create a new match..");
    console.log("name: " + this.name + ", local: " + this.local + ", date: " + this.date + ", numero de pessoas: " + this.numberOfPeople);
    let match = new Match(this.name, this.date.getTime(), this.local, this.numberOfPeople);
    console.log(match);
    this.firebaseService.addMatch(match)
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
