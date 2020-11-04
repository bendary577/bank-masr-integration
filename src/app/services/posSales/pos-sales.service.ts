import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tender } from 'src/app/models/Tender';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { Tax } from 'src/app/models/Tax';
import { Discount } from 'src/app/models/Discount';
import { RevenueCenter } from 'src/app/models/RevenueCenter';
import { ServiceCharge } from 'src/app/models/ServiceCharge';

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

  addTax(taxs: Tax[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_TAX_URL + "?syncJobTypeId=" + id, taxs, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addMajorGroup(majorGroups: MajorGroup[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_MAJOR_GROUP_URL + "?syncJobTypeId=" + id, majorGroups, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addDiscount(discounts: Discount[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_DISCOUNT_URL + "?syncJobTypeId=" + id, discounts, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addServiceCharge(serviceCharge: ServiceCharge[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_SERVICE_CHARGE_URL + "?syncJobTypeId=" + id, serviceCharge, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  addRevenueCenter(revenueCenters: RevenueCenter[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_POS_SALES_REVENUE_CENTER_URL + "?syncJobTypeId=" + id, revenueCenters, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
