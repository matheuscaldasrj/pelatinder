import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FirebaseService } from './../../services/firebase.service';

import { DatePicker } from '@ionic-native/date-picker';
import { User } from './../../models/user.model';
import { Match } from './../../models/match.model';
import { DateUtils } from './../../utils/Date.utils';


@IonicPage()
@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html',
})
export class NewMatchPage {

  name: string;
  local: string;
  date;
  numberOfPeople: number;
  user: User;
  dateUtils: DateUtils

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseService,
    public datePicker: DatePicker,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
    
    this.dateUtils = new DateUtils();

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var IsoString = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-1);

    this.date = IsoString;
    this.user = this.navParams.get("user");
  }

  
  createNewMatch() {

    if (!this.name || !this.local || !this.numberOfPeople) {
      let alert = this.alertCtrl.create({
        title: 'Campos em branco',
        subTitle: 'Preencha todos os campos para criar uma nova pelada',
        buttons: ['Ok']
      });

      alert.present();
      return;
    }

    let match = new Match(this.name, this.parseISOLocal(this.date).getTime(), this.local, this.numberOfPeople, this.user.uid);

    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
    });
    this.firebaseService.addMatch(match, this.user)
      .then(() => { toast.setMessage("Pelada criada com sucesso!"); toast.present(); })
      .catch((error) => { toast.setMessage("Houve um erro ao tentar criar a pelada"); toast.present(); });

    this.navCtrl.pop();
  }


  parseISOLocal(str) : Date{
    return this.dateUtils.parseISOLocal(str);
  }

}
