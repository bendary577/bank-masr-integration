import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { timeout, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  @Cacheable()
  getSuppliers() {
    // , { headers: new HttpHeaders({ timeout: `${360000}` }) }
    return this.http.get(Constants.GET_SUPPLIERS_URL + '?limit=2').pipe(
      timeout(360000),
      catchError(e => {
        // do something on a timeout
        return [];
      })
    );
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
