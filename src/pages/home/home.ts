import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import {NewMatchPage} from './../new-match/new-match';
import {MatchDetailsPage} from './../match-details/match-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatches;
  user: User;

  constructor(public navCtrl: NavController,public navParams: NavParams, public firebaseService: FirebaseService) {

      this.user = this.navParams.data.user;

      firebaseService.getNextMatches().subscribe(items => {
        this.nextMatches = items
        console.log(items)
      });
  }
  
  createNewMatch(){
    this.navCtrl.push(NewMatchPage);
  }

  showDetails(match : Match){
    this.navCtrl.push(MatchDetailsPage, {
      match: match
    });

  }
}