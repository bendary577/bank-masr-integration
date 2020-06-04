import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingsService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getGeneralSettings() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_GENERAL_SETTINGS_URL , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  updateGeneralSettings(generalSettings) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_GENERAL_SETTINGS_URL , generalSettings,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
}
