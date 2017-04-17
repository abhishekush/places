import { Component,OnInit } from '@angular/core';

import { ModalController, NavController, ToastController, LoadingController } from 'ionic-angular';

import {AddPlacePage} from '../add-place/add-place';

import {Place} from '../../models/place'; 

import {PlacesService} from '../../services/places'

import {PlacePage} from '../place/place';
import {User} from '../../providers/user';
import {LoginPage} from '../login/login';
import {Database} from '../../providers/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  places: Place[]=[];	
  addPlacePage=AddPlacePage;
  constructor(
  	private placesService: PlacesService,
  	private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private user: User,
    private database: Database
  	) {
    
  }

  ngOnInit(){
    this.placesService.fetchPlaces()
      .then((places:Place[])=>{
        this.places = places;
      });
  }

  ionViewWillEnter(){
    this.user.isAuth()
    .then((res) => {
      if(!res){
        console.log(res);
        this.navCtrl.setRoot(LoginPage);
      }
    })
  	this.places = this.placesService.loadPlaces();
    console.log('home', this.places);
  }

  onOpenPlace(place:Place,index:number){
    const modal = this.modalCtrl.create(PlacePage,{place:place,index:index});
    modal.present();
    modal.onWillDismiss(()=>{
   this.places = this.placesService.loadPlaces();   
    })
  }

  logout(){
    const load = this.loadCtrl.create({
      content: 'Bye Bye...'
    });
    load.present();
    this.database.logout()
    .then((res) => {
      load.dismiss();
      this.user.logout()
      .then((res) =>{
        if(res){
          this.navCtrl.setRoot(LoginPage);
        }
        else{
           this.toastCtrl.create({
             message: 'Oops!, Something went wrong...try again later!!',
             duration: 2500
           }).present();
        }
      });
    })
    .catch(()=>{
      load.dismiss();
    })
  }

}
