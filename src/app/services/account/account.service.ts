import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token = localStorage.getItem('auth_token');

  constructor(private http : HttpClient) { }

  getAccount() {
    return this.http.get(Constants.GET_ACCOUNT, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addAccount(account){
    return this.http.post(Constants.ADD_ACCOUNT , account, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).toPromise();
  }
}
