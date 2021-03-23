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

  syncExcel() {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.SYNC_OPERA_RESERVATION_URL, null,{ headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTransaction() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.Get_Transaction_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addSimphonyLocation(locations: SimphonyLocation[]) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_SIMPHONY_LOCATION_URL, locations, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
