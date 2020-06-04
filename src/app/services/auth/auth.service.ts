import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Cacheable } from 'ngx-cacheable';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('auth_token');


  constructor( private http: HttpClient, private cookie: CookieService) {}

  login(user:User) {
   var auth =window.btoa('web-client:web-client-secret');


   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic '+auth
    })
  };
    return this.http.post(Constants.LOGINAUTH + "?grant_type=password&username=" + user.username +
    "&password=" + user.password + "&clientid=web-client",{},httpOptions);
  }

  checkToken(){

    return this.http.get(Constants.CHECKAUTH,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})})
  }

  getUsers(){
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_USERS,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addUser(user){
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_USER, user,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

}
