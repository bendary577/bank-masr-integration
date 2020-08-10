import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { Tender } from 'src/app/models/Tender';
import { MajorGroup } from 'src/app/models/MajorGroup';

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

  addTender(tenders: Tender[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_TENDER_URL + "?syncJobTypeId=" + id, tenders, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addMajorGroup(majorGroups: MajorGroup[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_MAJOR_GROUP_URL + "?syncJobTypeId=" + id, majorGroups, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
