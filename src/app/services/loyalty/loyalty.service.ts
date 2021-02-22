import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getAppCompanies() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APP_COMPANIES_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addAppCompanies(company) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_APP_COMPANY_URL, company, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  deleteAppCompanies(companies) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_APP_COMPANIES_URL, companies, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAppGroups(companyId: String) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APP_GROUPS_URL + "?companyId=" + companyId, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addAppGroups(group) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_APP_GROUP_URL, group, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  deleteAppGroups(groups) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.Delete_APP_GROUPS_URL, groups, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

}
