import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Match } from './../../models/match.model';
import { User } from './../../models/user.model';
import { FirebaseService } from './../../services/firebase.service';
import { DateUtils } from "../../utils/Date.utils";

@IonicPage()
@Component({
  selector: 'page-match-details',
  templateUrl: 'match-details.html',
})
export class MatchDetailsPage {

  match: Match
  user: User;

  currentTime: Date;
  dateUtils: DateUtils;

  membersIds;
  confirmedMembersIds;
  //in this version player can only confirm
  // wontGoMembersIds;

  members: User[];
  confirmedMembers: User[];
  // wontGoMembers: User[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    this.currentTime = new Date();
    this.match = this.navParams.get("match");
    this.user = this.navParams.get("user");
    this.dateUtils = new DateUtils();


    this.updateMatch();
  }

  updateMatch() {
    this.firebaseService.getMatch(this.match.$key).subscribe((res) => {
      this.match = res;
      this.buildMembersArrays();
    })
  }

  buildMembersArrays() {
    this.members = new Array();
    this.membersIds = this.getAllAttributes(this.match.members);

    this.confirmedMembers = new Array();
    this.confirmedMembersIds = this.getAllAttributes(this.match.confirmedMembers);


    // this.wontGoMembers = new Array();
    // this.wontGoMembersIds = this.getAllAttributes(this.match.wontGoMembers);


    this.confirmedMembersIds.forEach(memberId => {
      this.firebaseService.getUserInfo(memberId)
        .subscribe((user: User) => {
          this.confirmedMembers.push(user);
        });
    });


    this.membersIds.forEach(memberId => {
      this.firebaseService.getUserInfo(memberId)
        .subscribe((user: User) => {
          this.members.push(user);
        });
    });


    // this.wontGoMembersIds.forEach(memberId => {
    //   this.firebaseService.getUserInfo(memberId)
    //     .subscribe((user: User) => {
    //       this.wontGoMembers.push(user);
    //     });
    // });


  }

  deleteMatch() {

    let alert = this.alertCtrl.create({
      title: 'Confirmar exclusão',
      message: 'Você foi o criador da pelada e se excluir ela será deletada para sempre. Tem certeza disso?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked in delete confirmation');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.firebaseService.removeMatch(this.match);
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();


  }

  joinMatch() {
    this.members = new Array();
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Por favor aguarde...'
    });

    loading.present();
    this.firebaseService.joinUserToMatch(this.match.$key, this.user).then(() => {
      console.log("Member has been added to the match " + this.user.name);
      loading.dismiss();
    });
  }


  getAllAttributes(object: Object): string[] {
    let array = new Array();

    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        array.push(property);
      }
    }
    return array;
  }

  isUserAlreadyParticipating() {
    return this.membersIds.indexOf(this.user.uid) > -1
  }

  isUserConfirmed() {
    return this.confirmedMembersIds.indexOf(this.user.uid) > -1
  }

  // isUserDeclined(){
  //    return this.wontGoMembersIds.indexOf(this.user.uid) > -1
  // }

  isUserAdmin() {
    return this.user.uid == this.match.createdBy;
  }

  leaveMatch() {
    this.members = new Array();
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Por favor aguarde..',
      duration: 2000
    });

    loading.present();

    this.firebaseService.leaveMatch(this.match.$key, this.user).then(() => {
        loading.dismiss();
    })
  }

  confirmMatch() {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
    });

    toast.setMessage("Confirmado para a pelada");


    this.firebaseService.confirmMatch(this.match.$key, this.user).then(() => {
      console.log("user " + this.user.name + "has confirmed to the match");
      toast.present();
    })
  }

  wontGo() {

    let alert = this.alertCtrl.create({
      title: 'Cancelar presença',
      message: 'Tem certeza que deseja cancelar sua presença?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked in delete confirmation');
          }
        },
        {
          text: 'Ok',
          handler: () => {
             this.firebaseService.wontGoMatch(this.match.$key, this.user).then(() => {
                console.log("user " + this.user.name + " wont go to the match");
              })
          }
        }
      ]
    });
    alert.present();


    // this.firebaseService.wontGoMatch(this.match.$key, this.user).then(() => {
    //   console.log("user " + this.user.name + " wont go to the match");
    // })
  }

  getFirstName(member: User) {
    var names = member.name.split(' ');
    return names[0];
  }

  getDayInfo() {
    return this.dateUtils.getDayInfo(this.match.date);
  }

}
