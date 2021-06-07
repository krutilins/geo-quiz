import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeoDataCountry } from '../models/geo-data-country.model';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodingService {

  constructor(private http: HttpClient) { }

  public reverseGeocoding(latLngLiteral: google.maps.LatLngLiteral): Observable<GeoDataCountry> {
    const url = 'https://api.geodatasource.com/city'
    const params: Params = {
      key: environment.geoDataSourceAPIKey,
      ...latLngLiteral
    }

    return this.http.get<GeoDataCountry>(url, { params });
  }
}
