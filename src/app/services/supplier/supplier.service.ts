import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  @Cacheable()
  getSuppliers() {
    return this.http.get(Constants.GET_SUPPLIERS_URL + '?limit=2');
  }

  getSuppliersDB() {
    return this.http.get(Constants.GET_SUPPLIERS_DB_URL);
  }

  getSuppliersTaxes() {
    return this.http.get(Constants.GET_SUPPLIERS_TAXES_URL);
  }
  getSuppliersGroups() {
    return this.http.get(Constants.GET_SUPPLIERS_GROUPS_URL);
  }
}
