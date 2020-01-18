import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:5000/auth';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor( private http: HttpClient, private cookie: CookieService) {}

  login(user) {
    return this.http.post(Constants.LOGINAUTH,user );
  }

  checkToken(){
    const headers = new HttpHeaders({'h1':'v1','h2':'v2'});
    let token = localStorage.getItem('auth_token');
    return this.http.get(Constants.CHECKAUTH,{ headers: new HttpHeaders({'Authorization': 'Bearer ' + token})})
  }

  @Cacheable()
  getUsers(){
    return this.http.get(Constants.GET_USERS);
  }

}
