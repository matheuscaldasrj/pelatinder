import { Match } from './../models/match.model'
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app'


@Injectable()
export class FirebaseService{


    constructor(public angularFireDatabase : AngularFireDatabase){
    }

    getNextMatches(){
        return this.angularFireDatabase.list('/matches');
    }

    addMatch(match : Match){
        return this.angularFireDatabase.list('/matches').push(match);
    }

    removeItem(match : Match){
        if(match['$key']){
            return this.angularFireDatabase.list('/matches').remove(match['$key'])
        }
        //else do nothing to prevent deleting all list :0
        return null;
    }

    loginWithGoogle(){
        // TODO WITHOUT POP UP
        // return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

}