import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class PosSalesService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getPOSSales() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_POS_SALES_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTenders() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_POS_SALES_TENDERS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }



}
