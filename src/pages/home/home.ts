import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';
import {NewMatchPage} from './../new-match/new-match';
import {MatchDetailsPage} from './../match-details/match-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatches;

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
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