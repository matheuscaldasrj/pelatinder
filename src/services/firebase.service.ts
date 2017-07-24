import { Match } from './../models/match.model'
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from './../models/user.model';

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

    addUser(user : User){
        this.angularFireDatabase.object('/users/' + user.uid).set(user).then(() =>{
            console.log("User was added: ");
            console.log(user);
        })
    }

    /**
     * 
     * @param key the match key
     * @param user the user to be added
     */
    addMemberToMatch(key : string, user : User){
           this.angularFireDatabase.object('matches/' + key + '/members/' + user.uid).set("true");
    }

      /**
     * 
     * @param keyMatch the match key
     * @param user the user to be added/updated
     */
    addMatchToUser(keyMatch : string, user : User){
        this.angularFireDatabase.object('/users/' + user.uid + "/matches/" + keyMatch).set("true");
    }

    removeMatch(match : Match){
        if(match['$key']){
            this.angularFireDatabase.list('/matches').remove(match['$key'])
            this.angularFireDatabase.list('/members').remove(match['$key'])
        }
        //else do nothing to prevent deleting all list :0
        return null;
    }


}