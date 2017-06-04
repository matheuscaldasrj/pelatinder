import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';
import { FirebaseListObservable } from 'angularfire2/database';
import {NewMatchPage} from './../new-match/new-match';

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

  public teste() {
    alert("Em teste")
  }
  
  createNewMatch(){
    this.navCtrl.push(NewMatchPage);
  }

  showDetails(match : Match){
    alert("Pagina show details");
    console.log(match);
    //TODO
    //add navigation to details page passing as paramteer
    //the match which was clicked
    // this.navCtrl.push(details, {
    //   match: match
    // })
  }
}