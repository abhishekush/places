import {Place} from '../models/place';
import {Location} from '../models/location';
export class PlacesService {

  private places: Place[] = [];

  addPlace(
  	title: string,
  	description: string,
  	location: Location,
  	imageUrl: string
  	){
  	let place = new Place(title,description,location,imageUrl);
  	this.places.push(place);
  }

  loadPlaces(){
  	return this.places.slice();
  }

}