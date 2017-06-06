import { Match } from './../models/match.model'
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FirebaseService{


    constructor(public angularFireDatabase : AngularFireDatabase){}

    getNextMatches(){
        return this.angularFireDatabase.list('/matches');
    }

    addMatch(match : Match){
        this.angularFireDatabase.list('/matches').push(match)
    }

    removeItem(match : Match){
        this.angularFireDatabase.list('/matches').remove(match.name)
    }

}