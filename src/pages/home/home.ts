import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import {NewMatchPage} from './../new-match/new-match';
import {MatchDetailsPage} from './../match-details/match-details';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatches: Object[];
  user: User;

  constructor(public navCtrl: NavController,public navParams: NavParams, public firebaseService: FirebaseService, private afAuth: AngularFireAuth) {
      console.log("Construtor do home")
      const authObserver = afAuth.authState.subscribe(user=>{
        console.log("1111111111111111")
        if(user){
          console.log("222222222222222")
          console.log(user);
          this.user = new User();
          this.user.name = user.displayName;
          this.user.photo = user.photoURL;

          authObserver.unsubscribe();
        }
      })

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