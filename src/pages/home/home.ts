import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Pelada } from './../../models/pelada.model';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatches;

  createNewGame() {
    console.log("lets create a new game")
  }
  constructor(public navCtrl: NavController, public firebaseService: FirebaseService) {
      firebaseService.getNextMatches().subscribe(items => {
        this.nextMatches = items
        console.log(items)
      });
  }

  public teste() {
    alert("Em teste")
  }
  
}