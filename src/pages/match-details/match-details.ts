import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from './../../models/match.model';
import { FirebaseService } from './../../services/firebase.service';
@IonicPage()
@Component({
  selector: 'page-match-details',
  templateUrl: 'match-details.html',
})
export class MatchDetailsPage {

  match : Match;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.match = this.navParams.data.match;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchDetailsPage');
  }

  deleteMatch(){
      this.firebaseService.removeMatch(this.match);
      this.navCtrl.pop();
  }
}
