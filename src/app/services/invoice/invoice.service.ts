import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getApprovedInvoices() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_APPROVED_INVOICES_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  @Cacheable()
  getCostCenter(syncJobTypeName) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_COST_CENTER_URL+ '?syncTypeName=' + syncJobTypeName
    , { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getBisinessUnits() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_BUSINESS_UNITS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  getPaymentMethods() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_PAYMENT_METHODS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  
}
