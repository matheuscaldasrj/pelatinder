import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public angularFireAuth: AngularFireAuth, private facebook: Facebook) {
    this.user = angularFireAuth.authState;
  }


  signinWithFacebook(){
    console.log("na signinWithFacebook! do AuthService")
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