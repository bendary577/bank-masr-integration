import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('auth_token');


  constructor( private http: HttpClient, private cookie: CookieService) {}

  login(user) {
    return this.http.post(Constants.LOGINAUTH, user);
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
