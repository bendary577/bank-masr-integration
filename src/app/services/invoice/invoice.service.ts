import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }
  @Cacheable()
  getApprovedInvoices() {
    return this.http.get(Constants.GET_APPROVED_INVOICES_URL);
  }

  getApprovedInvoicesDB() {
    return this.http.get(Constants.GET_APPROVED_INVOICES_DB_URL);
  }
}
