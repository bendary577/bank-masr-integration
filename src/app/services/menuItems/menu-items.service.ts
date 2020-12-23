import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

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
}
