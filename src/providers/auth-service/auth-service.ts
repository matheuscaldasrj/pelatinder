import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { NewUser } from './../../models/newUser.model';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public angularFireAuth: AngularFireAuth, private facebook: Facebook) {
    this.user = angularFireAuth.authState;
  }


  signinWithFacebook(){
    return this.facebook.login(['public_profile','email'])
            .then( (res: FacebookLoginResponse) =>{
                //this.facebook.api('')
                let accessToken = res.authResponse.accessToken;
                let authCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
                return this.angularFireAuth.auth.signInWithCredential(authCredential);
            })
            .catch( (error: any) => {
              console.log("Error while trying to log in using facebook", error);
            })
  }

  signInWithEmail(user : NewUser){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  createUser(user : NewUser){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signOutEmail(){
    return this.angularFireAuth.auth.signOut();
  }
  signOut(){
    let providerData = this.angularFireAuth.auth.currentUser.providerData;
    if(providerData.length){
      for (var i = 0; i < providerData.length; i++) {
        var provider = providerData[i];

        //if is facebook
        if(provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID){
          return this.facebook.logout()
          .then( ()=>{
            return this.signOutFireBase();
          })
        }
        
      }
    }
  }

  signOutFireBase(){
    return this.angularFireAuth.auth.signOut();
  }
  
}