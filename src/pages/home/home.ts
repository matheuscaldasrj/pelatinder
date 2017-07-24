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

  nextMatches: Match[];
  user: User;

  constructor(public navCtrl: NavController,public navParams: NavParams, public firebaseService: FirebaseService, private afAuth: AngularFireAuth) {

      const authObserver = afAuth.authState.subscribe(user=>{
        if(user){
          //only happens in first login
          console.log("first login");
          console.log(user);

          this.user = new User();
          this.user.name = user.displayName;
          this.user.photo = user.photoURL;
          this.user.uid = user.uid;
          this.user.email = user.email;
          this.user.matches = new Array();
         

          //add user to db
          this.firebaseService.addUser(this.user);
          authObserver.unsubscribe();
        }
      })

      firebaseService.getNextMatches().subscribe(items => {
        this.nextMatches = items
        console.log("volta do getNExtMatches:")
        console.log(items);
      });
  }
  
  createNewMatch(){
    this.navCtrl.push(NewMatchPage,{
      user: this.user
    });
  }

  showDetails(match : Match){
    this.navCtrl.push(MatchDetailsPage, {
      match: match,
      user: this.user
    });

  }
}