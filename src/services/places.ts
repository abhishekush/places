import {Place} from '../models/place';
import {Location} from '../models/location';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {File} from 'ionic-native';
import {User} from '../providers/user';

declare var cordova:any;

@Injectable()
export class PlacesService {

  private places: Place[] = [];
  uid: any;

  constructor(
     public storage: Storage,
     private user: User
    ){
    console.log('asdad');
    
    console.log(this.user.user);
  }
  
  addPlace(
  	title: string,
  	description: string,
  	location: Location,
  	imageUrl: string
  	){
  	let place = new Place(title,description,location,imageUrl);
  	this.places.push(place);
    this.storage.get('user')
    .then((res) => {
      this.uid = res.uid;
        this.storage.set(this.uid, this.places)
        .then(()=> console.log('uid hai ',this.uid))
        .catch(err=>{
          this.places.splice(this.places.indexOf(place),1);
        }); 
    })
   
  

  }


  loadPlaces(){
  	return this.places.slice();
  }

  fetchPlaces(){
    return this.storage.get('user')
    .then((res) => {
      this.uid = res.uid;
      console.log('yahan uid',this.uid);
    return this.storage.get(this.uid)
    .then(
        (places: Place[])=>{
          console.log('fetch',places);
          this.places = places != null ? places : [];
          return this.places;
        }
      )
    .catch(err=>{
      console.log(err);
    });
    })

  }
  
  deletePlace(index:number){
    return this.storage.get('user')
    .then((res) => {
      this.uid = res.uid;
      const place = this.places[index];
      this.places.splice(index,1);
      this.storage.set(this.uid, this.places)
      .then((res) => {
        console.log(this.places);
        this.removeFile(place);
      })
      .catch(err=>{
        console.log(err);
       }
      );      
    })    

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