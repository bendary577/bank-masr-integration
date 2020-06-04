import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }


  addUser(user) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_USER , user, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
}
