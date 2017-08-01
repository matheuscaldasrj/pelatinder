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
  membersIds;
  members: User[];
  currentTime: Date;
  dateUtils: DateUtils;
  confirmedMembers: User[];
  wontGoMembers: User[];

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
      this.buildMembersId();
    })
  }

  buildMembersId() {
    this.members = new Array();
    this.membersIds = new Array();
    this.membersIds = this.getAllAttributes(this.match.members);

    this.membersIds.forEach(memberId => {
      this.firebaseService.getUserInfo(memberId)
        .subscribe((user: User) => {

          this.members.push(user);
          console.log(this.members);

        });
    });

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

  confirm() {
    alert("Confirmado");
  }

  wontGo() {
    alert("Não vai");
  }

  getFirstName(member: User) {
    var names = member.name.split(' ');
    return names[0];
  }

  getDayInfo() {
    return this.dateUtils.getDayInfo(this.match.date);
  }

}
