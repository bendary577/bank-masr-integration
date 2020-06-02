import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }


  updateOverGroups(overGroups){
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_OVER_GROUPS_URL , overGroups, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).toPromise();
  }
}
