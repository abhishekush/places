import {Place} from '../models/place';
import {Location} from '../models/location';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {File} from 'ionic-native';

declare var cordova:any;

@Injectable()
export class PlacesService {

  private places: Place[] = [];

  constructor(
     public storage: Storage
    ){}
  
  addPlace(
  	title: string,
  	description: string,
  	location: Location,
  	imageUrl: string
  	){
  	let place = new Place(title,description,location,imageUrl);
  	this.places.push(place);
    this.storage.set('places', this.places)
    .then()
    .catch(err=>{
      this.places.splice(this.places.indexOf(place),1);
    });
  }


  loadPlaces(){
  	return this.places.slice();
  }

  fetchPlaces(){
    return this.storage.get('places')
    .then(
        (places:Place[])=>{
          this.places = places != null ? places : [];
          return this.places;
        }
      )
    .catch(err=>{
      console.log(err);
    });
  }
  
  deletePlace(index:number){
    const place = this.places[index];
  	this.places.splice(index,1);
    this.storage.set('places',this.places)
    .then(()=>{
      this.removeFile(place);
    })
    .catch(err=>{
      console.log(err);
     }
    );
  }

  private removeFile(place: Place){
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    File.removeFile(cordova.file.dataDirectory,currentName)
      .then(()=>{
        console.log('file removed');
      })
      .catch(()=>{
        console.log('file could not be removed');
        this.addPlace(place.title,place.description,place.location,place.imageUrl);
      });
  }

}