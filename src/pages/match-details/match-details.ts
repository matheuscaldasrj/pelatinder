import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import { FirebaseService } from './../../services/firebase.service';

@IonicPage()
@Component({
  selector: 'page-match-details',
  templateUrl: 'match-details.html',
})
export class MatchDetailsPage {

  match : Match
  user: User;
  membersIds;
  members: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebaseService: FirebaseService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
    

    this.match = this.navParams.get("match");
    this.user = this.navParams.get("user");

    
    this.updateMatch();
  }

  buildMembersId(){
    this.members = new Array();
    this.membersIds = new Array();
    this.membersIds = this.getAllAttributes(this.match.members);
    
    this.membersIds.forEach(memberId => {
    this.firebaseService.getUserInfo(memberId)
                        .subscribe( (user : User) =>{
                            
                            this.members.push(user);
                            
                        });
    });
    
  }

  deleteMatch(){
      this.firebaseService.removeMatch(this.match);
      this.navCtrl.pop();
  }

  joinMatch(){
    this.members = new Array();
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();
    this.firebaseService.joinUserToMatch(this.match.$key, this.user).then( () => {
      console.log("Member has been added to the match " + this.user.name);
      loading.dismiss();
    });
  }

  updateMatch(){
    this.firebaseService.getMatch(this.match.$key).subscribe( (res)=>{
      this.match = res;
      this.buildMembersId();
    })
  }
  getAllAttributes(object : Object) : string[]{
    let array = new Array();

    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            array.push(property);
        }
    }
    return array;
  }

  isUserAlreadyParticipating(){
    return this.membersIds.indexOf(this.user.uid) > -1
  }

  isUserAdmin(){
    return this.user.uid == this.match.createdBy;
  }

  leaveMatch(){


    this.members = new Array();
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      duration:2000
    });

    loading.present();

    this.firebaseService.leaveMatch(this.match.$key, this.user).then( ()=>{
      loading.dismiss();
    })
  }


}
