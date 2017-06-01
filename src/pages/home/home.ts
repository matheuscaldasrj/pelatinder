import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireBase } from './../../services/firebase.service';
import { Pelada } from './../../models/pelada.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nextMatches = []

  constructor(public navCtrl: NavController) {
     let firebase = new FireBase();
     this.nextMatches = firebase.getNextMatches();
  }


}
