import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewMatchPage } from '../pages/new-match/new-match';
import { MatchDetailsPage } from '../pages/match-details/match-details';
import { CreateAccountPage } from './../pages/create-account/create-account';
import { LoginEmailPage } from './../pages/login-email/login-email';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service/auth-service';
import {Facebook} from '@ionic-native/facebook';
import { FirebaseService } from './../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';

// datePicker
import { DatePicker } from '@ionic-native/date-picker';
import { ProfileComponent } from '../components/profile/profile';

 
const firebaseConfig = {
    apiKey: "AIzaSyCUE7XBqhtqVHBbI1ZpKDS6uY7O7DHgTAs",
    authDomain: "pelatinder.firebaseapp.com",
    databaseURL: "https://pelatinder.firebaseio.com",
    projectId: "pelatinder",
    storageBucket: "pelatinder.appspot.com",
    messagingSenderId: "149301331031"
  };

  //

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewMatchPage,
    MatchDetailsPage,
    LoginPage,
    ProfileComponent,
    CreateAccountPage,
    LoginEmailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewMatchPage,
    MatchDetailsPage,
    LoginPage,
    CreateAccountPage,
    LoginEmailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    DatePicker,
    AuthService,
    AngularFireAuth,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
