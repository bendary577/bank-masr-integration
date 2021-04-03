import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({ 
  providedIn: 'root'
})
export class LoyaltyService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getAppGroups() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APP_GROUPS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addAppGroups(group, addFlag) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_APP_GROUP_URL + "?addFlag=" + addFlag, group, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
  
    deleteAppGroups(groups) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_APP_GROUPS_URL, groups, {
       headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAppUsers() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APP_USERS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTopUsers() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TOP_USERS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addAppUsers(user, addFlag) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_APP_USER_URL + "?addFlag=" + addFlag , user, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getTransactions(transactionType) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TRANSACTION_URL + "?transactionType=" + transactionType , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTopGroups() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TOP_Groups_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
}
