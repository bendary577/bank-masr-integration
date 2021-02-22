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
}
