import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Account } from 'src/app/models/Account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  account: Account;
  generalSettings: GeneralSettings;
  token = localStorage.getItem('auth_token');

  constructor( private http: HttpClient) {}

  login(user:User) {
   const auth =window.btoa('web-client:web-client-secret');

   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic '+auth
    })
  };
    return this.http.post(Constants.LOGINAUTH + "?grant_type=password&username=" + user.username +
    "&password=" + user.password + '&clientid=web-client',{},httpOptions);
  }

  checkToken() {
    return this.http.get(Constants.CHECKAUTH,{ headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})})
  }

  getUsers() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_USERS,{ headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addUser(user) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_USER, user, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

}
