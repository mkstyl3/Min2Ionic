import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Activity } from '../../models/activity';

declare const google; //  Google Maps SDK

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any; // #map
  
  private activities: Activity[] = [];

  constructor(public navCtrl: NavController, public geolocation: Geolocation, ) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadActivities() {
    this.activities.push(new Activity(1,'canal olimpic', 41.2791507, 1.9906636,));
    for (let activity of this.activities) {
      this.addMarker(activity.lat, activity.long, activity.name);
      }
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.loadActivities();
 
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(lat:number, long:number, activity_name: string) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lat, long)
    });
   
    let content = "<h4>The "+activity_name+"</h4>";         
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map, marker);
  }

  whereIam(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>I'm here!</h4>";         
   
    this.addInfoWindow(marker, content);
    
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
  
}
