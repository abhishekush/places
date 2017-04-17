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

  public user: any = {
  	uid:'',
  	login: false
  };

  authenticate(uid){
  	
  	this.user.login = true;
  	this.user.uid = uid;
  	return this.storage.set('user', this.user)
  	.then(() => {return true})
  	.catch(() => {
  		this.user.login = false;
  		this.user.uid = '';
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
    this.user.login = false;
    this.user.uid = '';  	
  	return this.storage.set('user', this.user)
  	.then(() => {
  		return true;
  	})
  	.catch(() => {
  		return false;
  	});
  }



}
