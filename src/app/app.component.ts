import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public zoom = 12;

  public center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  public ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  public zoomIn() {
    if (this.zoom < (this.options.maxZoom || 15)) this.zoom++
  }

  public zoomOut() {
    if (this.zoom > (this.options.minZoom || 0)) this.zoom--
  }

  public click(event: google.maps.MouseEvent) {
    console.log(event.latLng.toJSON())
    console.log(event.latLng.toString())
    console.log(event.latLng.toUrlValue())
  }
}
