import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';

@IonicPage()
@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html',
})
export class NewMatchPage {

  name: string;
  local: string;
  date: Date;
  numberOfPeople: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMatchPage');
  }


  createNewMatch(){
    console.log("lets create a new match..");
    console.log("name: " + this.name + ", local: " + this.local + ", date: " + this.date + ", numero de pessoas: " + this.numberOfPeople);
    let match = new Match(this.name, new Date() , this.local, this.numberOfPeople);
    this.firebaseService.addMatch(match)
    this.navCtrl.pop();
  }
}
