import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';
import { Cacheable } from 'ngx-cacheable';
@Injectable({
  providedIn: 'root'
})
export class VendorService {
  vendorAccountIDS = [];

  constructor(private http: HttpClient) { }


  @Cacheable()
  getData() {
    return this.http.get(Constants.VENDOR_URL);
  }


  addVendor(body) {
    return this.http.post(Constants.ADD_VENDOR_URL, body).toPromise();
  }
}
