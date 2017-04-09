import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire} from 'angularfire2';

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  constructor(
  	public http: Http,
  	private af: AngularFire
  	) {
    console.log('Hello Database Provider');
  }

  public login(user){
   return this.af.auth.login({
  		email: user.email, 
  		password: user.password
  	})
  	.then((res)=>{
  		return res;
  	})
  	.catch(()=>{
  	 return this.af.auth.createUser({
  			email: user.email,
  			password: user.password
  		})
  		.then((res) => {
  			return res;
  		})
  	});
  }

  public logout(){
  	return this.af.auth.logout()
  	.then((res) => {return res});
  }

}
