import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';
import {Place} from '../../models/place';
import {PlacesService} from '../../services/places';

/*
  Generated class for the Place page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {
  place: Place;
  index:number;
  constructor( 
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	public placesService: PlacesService
  	) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  onLeave(){
  	this.viewCtrl.dismiss();
  }

  onDelete(){
   this.placesService.deletePlace(this.index);
   this.viewCtrl.dismiss();
  }

}
