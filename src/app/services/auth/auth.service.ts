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

  forgetPassword(email:String) {
    return this.http.post(Constants.FORGET_PASSWORD_API + "?email=" + email , { headers: new HttpHeaders()});
  }

  resetPassword(password:String) {
    return this.http.post(Constants.RESET_PASSWORD_API, password, { headers: new HttpHeaders()});
  }

  checkToken() {
    return this.http.get(Constants.CHECKAUTH,{ headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})})
  }

  getUsers() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_USERS,{ headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addUser(user ,addFlag) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_USER + "?addFlag=" + addFlag , user, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  deleteUsers(flage, user) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_USERS_URL + "?addFlag=" + flage + "&userId=" + user.id , "", {
       headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

}
