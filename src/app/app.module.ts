import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewMatchPage } from '../pages/new-match/new-match';
import { MatchDetailsPage } from '../pages/match-details/match-details';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './../services/firebase.service';
import { DatePicker } from '@ionic-native/date-picker';

 
const firebaseConfig = {
    apiKey: "AIzaSyCUE7XBqhtqVHBbI1ZpKDS6uY7O7DHgTAs",
    authDomain: "pelatinder.firebaseapp.com",
    databaseURL: "https://pelatinder.firebaseio.com",
    projectId: "pelatinder",
    storageBucket: "pelatinder.appspot.com",
    messagingSenderId: "149301331031"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewMatchPage,
    MatchDetailsPage,
    LoginPage
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
    ListPage,
    NewMatchPage,
    MatchDetailsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
