import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class WastageService {

  token = "";

  constructor(private http : HttpClient) { }

  getWastage(){
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_WASTE_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getwasteGroups(){
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_WASTE_GROUPS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }


}
