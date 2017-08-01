import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import {NewMatchPage} from './../new-match/new-match';
import {MatchDetailsPage} from './../match-details/match-details';

import { AngularFireAuth } from 'angularfire2/auth';
import { DateUtils } from "../../utils/Date.utils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  nextMatches: Match[];
  user: User;
  teste;
  dateUtils: DateUtils;

  constructor(public navCtrl: NavController,public navParams: NavParams, public firebaseService: FirebaseService, private afAuth: AngularFireAuth) {

      this.dateUtils = new DateUtils();
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
            this.user.name  = "Paolo Guerrero";
          }
          if(!user.photoURL){
            this.user.photo = "http://colunadoflamengo.com/wp-content/uploads/2015/10/1315690202-paolo-guerrero-flamengo-bayern-RPduEf6oief.jpg"
          }

          //add user to db (its the first time loggin in)
          this.firebaseService.addUser(this.user);
          console.log("user has been added to database");
          authObserver.unsubscribe();
        }
      })

      firebaseService.getNextMatches().subscribe(matches => {
        this.nextMatches = matches;
      });

  }
  
  createNewMatch() : void{
    this.navCtrl.push(NewMatchPage,{
      user: this.user
    });
  }

  showDetails(match : Match) : void{
    console.log(match);
    this.navCtrl.push(MatchDetailsPage, {
      match: match,
      user: this.user
    });

  }

  getDayInfo(dateToBeCompared) : string{
     return this.dateUtils.getDayInfo(dateToBeCompared);
  }
  
}