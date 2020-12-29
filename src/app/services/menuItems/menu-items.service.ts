import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { SimphonyLocation } from 'src/app/models/SimphonyLocation';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getMenuItems() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_MENU_ITEMS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addSimphonyLocation(locations: SimphonyLocation[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_SIMPHONY_LOCATION_URL + "?syncJobTypeId=" + id, locations, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}