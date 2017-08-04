import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Match } from './../models/match.model'


import { User } from './../models/user.model';

@Injectable()
export class FirebaseService{

    mathches;
    constructor(public angularFireDatabase : AngularFireDatabase){

    }

    getNextMatches(){
        return  this.angularFireDatabase.list('/matches')
    }

    getMatch(matchKey : string){
        return  this.angularFireDatabase.object('/matches/' + matchKey);
    }

    getUserInfo(userId: string){
        return this.angularFireDatabase.object('/users/' + userId)
    }
     getUserInfo2(userId: string){
        return this.angularFireDatabase.object('/users/' + userId , { preserveSnapshot: true });
    }
    addMatch(match : Match, user : User){
       return this.angularFireDatabase.list('/matches').push(match).then((res) => {
           return this.addMemberToMatch(res.key, user).then( () => {
                return this.addMatchToUser(res.key, user);
           });
           
       });
    }

    addUser(user : User){
        this.angularFireDatabase.object('/users/' + user.uid).set(user).then(() =>{
        })
    }

    /**
     * 
     * @param key the match key
     * @param user the user to be added
     */
    private addMemberToMatch(key : string, user : User){
           return this.angularFireDatabase.object('matches/' + key + '/members/' + user.uid).set("true");
    }

      /**
     * 
     * @param keyMatch the match key
     * @param user the user to be added/updated
     */
    private addMatchToUser(keyMatch : string, user : User){
        return this.angularFireDatabase.object('/users/' + user.uid + "/matches/" + keyMatch).set("true");
    }

      /**
     * 
     * @param keyMatch the match key
     * @param user the user to be added to the match
     */
    joinUserToMatch(keyMatch : string, user : User){
        return this.addMatchToUser(keyMatch,user).then( ()=>{
            return this.addMemberToMatch(keyMatch, user);
        })
    }

    removeMatch(match : Match){
        if(match.$key){
            //removing match from member
            let membersIds = this.getAllAttrbutes(match.members);
            membersIds.forEach(memberId => {
                this.removeMatchFromUser(match.$key,memberId);
            });
            //removing match;
            this.angularFireDatabase.list('/matches').remove(match.$key)
        }

        //else do nothing to prevent deleting all list :0
        return null;
    }

    getAllAttrbutes(object : Object) : string[]{
        let array = new Array();

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                array.push(property);
            }
        }
        return array;
  }

     leaveMatch(keyMatch: string, user: User) {
       return this.removeMatchFromUser(keyMatch, user.uid).then(() => {
            return this.removeUserFromMatch(keyMatch, user.uid).then( ()=> {
                return this.wontGoMatch(keyMatch, user);
            });
        })
    }
 
    removeMatchFromUser(keyMatch: string, userId: string) {
        return this.angularFireDatabase.list('/users/' + userId + "/matches").remove(keyMatch);
    }
 
    removeUserFromMatch(keyMatch: string, userId: string) {
        return this.angularFireDatabase.list('/matches/' + keyMatch + "/members").remove(userId);
    }

    /**
     * 
     * @param keyMatch the match key
     * @param user the user that has confirmed
     */
    public confirmMatch(keyMatch : string, user : User){
        return this.angularFireDatabase.object('matches/' + keyMatch + "/wontGoMembers/" + user.uid).remove().then( () => {
            return this.angularFireDatabase.object('matches/' + keyMatch + "/confirmedMembers/" + user.uid).set("true");
        })
    }

     /**
     * 
     * @param keyMatch the match key
     * @param user the user that had said he "wont go"
     */
    public wontGoMatch(keyMatch : string, user : User){
        return this.angularFireDatabase.object('matches/' + keyMatch + "/confirmedMembers/" + user.uid).remove().then( () => {
             return this.angularFireDatabase.object('matches/' + keyMatch + "/wontGoMembers/" + user.uid).set("true");
        })
       
    }

    


}