import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {Database} from '../../providers/database';
import {User} from '../../providers/user';
import {HomePage} from '../home/home';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  err:string;
  constructor(
  	public navCtrl: NavController, 
  	public toastCtrl: ToastController,
  	public navParams: NavParams,
  	public loadCtrl: LoadingController,
  	private database: Database,
  	private userService: User
  ) {}
  user:any={
  	email: '',
  	password: ''
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	const load = this.loadCtrl.create({
  		content: 'Connecting Database...'
  	});
  	load.present();
  	this.database.login(this.user)
  	.then((res) => {
  		this.userService.authenticate()
  		.then((res) => {
  			if(res){
              this.navCtrl.setRoot(HomePage);
  			}
  			else{
  		this.toastCtrl.create({
  			message: 'Oops!, Something went wrong...Try again!!',
  			duration: 2500
  		}).present();  				
  			}
  		})
  		load.dismiss();
  	})
  	.catch((err) => {
       this.err = err.message; 
       load.dismiss();

  	});
  }

}
