import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {PlacePage} from '../pages/place/place';
import {AddPlacePage} from '../pages/add-place/add-place';
import {SetLocationPage} from '../pages/set-location/set-location';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {PlacesService} from '../services/places';
import {Storage} from '@ionic/storage';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {Database} from '../providers/database';
import {User} from '../providers/user';

  export const firebaseConfig = {
    apiKey: "AIzaSyDKIiRmxeCaAOAXPpgwPQb5lrmFbFisYEA",
    authDomain: "freezeit-a9ec3.firebaseapp.com",
    databaseURL: "https://freezeit-a9ec3.firebaseio.com",
    projectId: "freezeit-a9ec3",
    storageBucket: "freezeit-a9ec3.appspot.com",
    messagingSenderId: "210367573307"
  };
const firebaseAuthConfig=({
provider: AuthProviders.Password,
method: AuthMethods.Password
})  


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    CapitalizePipe,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAw2X3FlgIM4pT4gDv3LbKsAyUWYButr3g'
    }),
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage,
    LoginPage    
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  PlacesService, 
  Storage,
  Database,
  User
  ]
})
export class AppModule {}
