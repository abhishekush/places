import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {Location} from '../../models/location';

/*
  Generated class for the SetLocation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage {

  location:Location;
  marker:Location;
  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController
   ) {
    this.location=this.navParams.get('location');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }

  onSetMarker(event:any){
  	this.marker=new Location(event.coords.lat,event.coords.lng);
  }

  onConfirm(){
  	console.log("marker");
  	console.log(this.marker);
  	this.viewCtrl.dismiss({location:this.marker});

  }

  onAbort(){
  	this.viewCtrl.dismiss();
  }

}
