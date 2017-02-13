import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ModalController} from 'ionic-angular';
import {SetLocationPage} from '../set-location/set-location';
import {Location} from '../../models/location';
import {Geolocation} from 'ionic-native';
/*
  Generated class for the AddPlace page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {
  
  public location:Location={
    lat: 25.771315,
    lng: 73.323685
  };
  public locationIsSet=false;

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public modalCtrl: ModalController
   ) {}

  onSubmit(form:NgForm){
  	alert(form.value);
  }

  onOpenMap(){
  	const modal=this.modalCtrl.create(SetLocationPage,{location:this.location,isSet:this.locationIsSet});
  	modal.present();
  	modal.onDidDismiss(data=>{
  		this.location=data.location;
  		console.log(this.location);
  		this.locationIsSet=true;
  	})
  }

  onLocate(){
  	Geolocation.getCurrentPosition().then((loc)=>{
      this.location.lat = loc.coords.latitude;
      this.location.lng = loc.coords.longitude
      this.locationIsSet = true;
  	}).catch(error=>{
  		console.log(error);
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }



}
