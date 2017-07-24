import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import { FirebaseService } from './../../services/firebase.service';

@IonicPage()
@Component({
  selector: 'page-match-details',
  templateUrl: 'match-details.html',
})
export class MatchDetailsPage {

  match : Match;
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseService) {
    this.match = this.navParams.data.match;
    this.user = this.navParams.data.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchDetailsPage');
  }

  deleteMatch(){
      this.firebaseService.removeMatch(this.match);
      this.navCtrl.pop();
  }

  joinMatch(){
    console.log("join match function")
    console.log(this.match);
    //todo - only one method
    this.firebaseService.addMatchToUser(this.match['$key'],this.user);
    this.firebaseService.addMemberToMatch(this.match['$key'], this.user);
  }
}
