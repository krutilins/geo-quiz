import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BatutaCountry } from '../models/batuta-country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<BatutaCountry[]> {
    const url = "http://battuta.medunes.net/api/country/all/";
    const params: Params = {
      key: environment.battutaAPIKey
    }

    return this.http.get<BatutaCountry[]>(url, { params });
  }
}
