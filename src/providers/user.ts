import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  constructor(
  	public http: Http,
  	private storage: Storage
  	) {
    console.log('Hello User Provider');
  }

  private user: any = {
  	login: false
  };

  authenticate(){
  	this.user.login = true;
  	return this.storage.set('user', this.user)
  	.then(() => {return true})
  	.catch(() => {
  		this.user.login = false;
  		return false
  	});
  }

  isAuth(){
  	return this.storage.get('user')
  	.then((user) => {
       return user.login;
  	});
  }

  logout(){
  	this.user.login = false;
  	return this.storage.set('user', this.user)
  	.then(() => {
  		return true;
  	})
  	.catch(() => {
  		return false;
  	});
  }



}
