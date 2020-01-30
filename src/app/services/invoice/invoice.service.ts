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
    return this.http.get(Constants.GET_APPROVED_INVOICES_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getApprovedInvoicesDB() {
    return this.http.get(Constants.GET_APPROVED_INVOICES_DB_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  
  @Cacheable()
  getCostCenter() {
    return this.http.get(Constants.GET_COST_CENTER_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getBisinessUnits() {
    return this.http.get(Constants.GET_BUSINESS_UNITS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  getPaymentMethods() {
    return this.http.get(Constants.GET_PAYMENT_METHODS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  
}
