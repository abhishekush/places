import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ModalController,LoadingController, ToastController} from 'ionic-angular';
import {SetLocationPage} from '../set-location/set-location';
import {Location} from '../../models/location';
import {Geolocation, Camera} from 'ionic-native';
import {PlacesService} from '../../services/places';

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
  public imageUrl = '';

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public modalCtrl: ModalController,
   public loadCtrl: LoadingController,
   public toastCtrl: ToastController,
   private placesService: PlacesService
   ) {}

  onSubmit(form:NgForm){
  	this.placesService.addPlace(
        form.value.title,
        form.value.description,
        form.value.location,
        form.value.imageUrl
      );
    form.reset();
    this.location = {
      lat: 25.771315,
      lng: 73.323685
    };

    this.locationIsSet = false;
    this.imageUrl = '';
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
  	const load = this.loadCtrl.create({
  		content: 'Fetching Your Location...'
  	});
  	load.present()
  	Geolocation.getCurrentPosition().then((loc)=>{
  	  load.dismiss();	
      this.location.lat = loc.coords.latitude;
      this.location.lng = loc.coords.longitude
      this.locationIsSet = true;
  	}).catch(error=>{
  		load.dismiss();
  		const toast = this.toastCtrl.create({
  			message : 'Could not get location, please pick it manually!',
  			duration: 2500
  		});
  		toast.present()
  		console.log(error);
  	})
  }

  onTakePhoto() {
  	Camera.getPicture({
  		encodingType: Camera.EncodingType.JPEG,
  		correctOrientation: true
  	}).then(imageData=>{
  		this.imageUrl = imageData;
  	}).catch(error=>{
  		console.log(error);
  	})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }



}
