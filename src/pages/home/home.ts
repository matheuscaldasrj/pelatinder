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
  teste;

  constructor(public navCtrl: NavController,public navParams: NavParams, public firebaseService: FirebaseService, private afAuth: AngularFireAuth) {

      const authObserver = afAuth.authState.subscribe(user=>{

        if(user){
          //only happens in first login
          this.user = new User();
          this.user.name = user.displayName;
          this.user.photo = user.photoURL;
          this.user.uid = user.uid;
          this.user.email = user.email;
          this.user.matches = new Array();
          
          if(!user.displayName){
            this.user.name  = "Diego Ribas";
          }
          if(!user.photoURL){
            this.user.photo = "http://www.falandodeflamengo.com.br/wp-content/uploads/2016/07/diego-ribas-fenerbahce_jtdm01wkc14o1nizl91rivw2b.jpg"
          }

          //add user to db (its the first time loggin in)
          this.firebaseService.addUser(this.user);
          authObserver.unsubscribe();
        }
      })

      firebaseService.getNextMatches().subscribe(matches => {
        this.nextMatches = matches;
      });

  }
  
  createNewMatch(){
    this.navCtrl.push(NewMatchPage,{
      user: this.user
    });
  }

  showDetails(match : Match){
    console.log(match);
    
    this.navCtrl.push(MatchDetailsPage, {
      match: match,
      user: this.user
    });

  }
}