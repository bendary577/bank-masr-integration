import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class BookedProductionService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getCreditNote() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_BOOKED_PRODUCTION_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

}
