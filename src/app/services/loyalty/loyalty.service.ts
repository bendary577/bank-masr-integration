import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({ 
  providedIn: 'root'
})
export class LoyaltyService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getAllAppGroups(status) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_ALL_APP_GROUPS_URL + "?status=" + status, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getAppGroups(isParent, groupId, status: number) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APP_GROUPS_URL + "?isParent=" +  isParent + "&parentId=" + groupId + "&status=" + status,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }


  addAppGroups(flage, name, description, discountRate, discountId, parentGroupId, image, groupId) {
    this.token = localStorage.getItem('auth_token');
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('discountRate', discountRate);
    formData.append('discountId', discountId);
    formData.append('parentGroupId', parentGroupId);
    formData.append('image', image);
    formData.append('groupId', groupId);
    return this.http.post(Constants.ADD_APP_GROUP_URL + "?addFlag=" + flage , formData, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
  
  deleteAppGroups(flage, groups, deleteUsers, parentGroupId) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_APP_GROUPS_URL + "?addFlag=" + flage  + "&deleteUsers=" + deleteUsers + "&parentGroupId=" + parentGroupId , groups, {
       headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  getTopGroups() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TOP_Groups_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
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

  addApplicationUser(flage, name, email, groupId, image, userId) {
    this.token = localStorage.getItem('auth_token');
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('groupId', groupId);
    formData.append('image', image);
    formData.append('userId', userId);
    return this.http.post(Constants.ADD_APP_USER_URL  + "?addFlag=" + flage , formData, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  deleteAppUsers(flage, users) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_APP_USERS_URL + "?addFlag=" + flage , users, {
       headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getTransactions(transactionType) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TRANSACTION_URL + "?transactionType=" + transactionType , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTotalSpend(date) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_TOTAL_SPEND_URL + "?transactionType=" + Constants.REDEEM_VOUCHER + "&dateFlag=" + date
    , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
}
