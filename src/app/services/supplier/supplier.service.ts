import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getSuppliers() {
    return this.http.get(Constants.GET_SUPPLIERS_URL,
     { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSuppliersDB() {
    return this.http.get(Constants.GET_SUPPLIERS_DB_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSuppliersTaxes() {
    return this.http.get(Constants.GET_SUPPLIERS_TAXES_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  getSuppliersGroups() {
    return this.http.get(Constants.GET_SUPPLIERS_GROUPS_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
