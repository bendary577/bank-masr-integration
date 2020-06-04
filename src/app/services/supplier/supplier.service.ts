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
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_SUPPLIERS_URL,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }


  @Cacheable()
  getSuppliersTaxes() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_SUPPLIERS_TAXES_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  @Cacheable()
  getSuppliersGroups() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_SUPPLIERS_GROUPS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
}
