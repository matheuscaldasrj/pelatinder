import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//services
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service/auth-service';
import {ToastService} from './../services/toast.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = LoginPage;
  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              afAuth: AngularFireAuth,
              private authService: AuthService,
              private toastService : ToastService) {

    const authObserver = afAuth.authState.subscribe( (user) => {
      if(user){
        //we already has an user, go directly to home page
        this.rootPage = HomePage;
      }
      else{
        //go to login page
        this.rootPage = LoginPage;
      }
      authObserver.unsubscribe();
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'person'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOutFacebook(){
    this.authService.signOut()
    .then( () =>{
       this.toastService.presentToast("LogOut efetuado com sucesso!");
    })
    .catch( () => {
       this.toastService.presentToast("Ocorreu um erro ao tentar deslogar");
    })
    ;
    this.nav.setRoot(LoginPage);
  }
}
