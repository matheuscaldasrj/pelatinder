import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { MatchRest } from './../../models/matchRest.model';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import {NewMatchPage} from './../new-match/new-match';
import {MatchDetailsPage} from './../match-details/match-details';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatchesRest: MatchRest[];
  nextMatches: FirebaseListObservable<Match[]>;
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
         
          if(!user.displayName){
            this.user.name  = "Diego Ribas";
          }
          if(!user.photoURL){
            this.user.photo = "http://www.falandodeflamengo.com.br/wp-content/uploads/2016/07/diego-ribas-fenerbahce_jtdm01wkc14o1nizl91rivw2b.jpg"
          }

          //add user to db
          this.firebaseService.addUser(this.user);
          authObserver.unsubscribe();
        }
      })

      this.nextMatches = firebaseService.getNextMatches();
  
  }
  
  buildMatchesFromMatchRest(){
    //  console.log("buildMatchesFromMatchRest")
    //  this.nextMatches = new Array();
    //   console.log(this.nextMatchesRest);
    //     for (var i = 0; i < this.nextMatchesRest.length; i++) {
    //       var currentMatchRest = this.nextMatchesRest[i];
    //       //buildMatch
    //       var currentMatch = new Match();
    //       currentMatch.currentNumOfPlayers = currentMatchRest.currentNumOfPlayers;
    //       currentMatch.date = currentMatchRest.date;
    //       currentMatch.local = currentMatchRest.local;
    //       currentMatch.name = currentMatchRest.name;
    //       currentMatch.numOfPlayers = currentMatchRest.numOfPlayers;
    //       currentMatch.members = new Array<User>();
    //       console.log("current match esta até agora: ")

    //       console.log(currentMatch);

    //       for (var property in currentMatchRest.members) {
    //           if (currentMatchRest.members.hasOwnProperty(property)) {
    //              console.log("loop das properites");
    //              console.log(property);

    //               this.firebaseService.getUserInfo(property).subscribe( user => {
    //                 let currentUser = <User> user;    
    //                 console.log("o user que veio foi: ");
    //                 console.log(currentUser);   
    //                 currentMatch.members.push(user);             
    //               })
    //           }
    //       }

    //       this.nextMatches.push(currentMatch);
    //       console.log("this.nextMatches lala");
    //       console.log(this.nextMatches)

    //     }
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