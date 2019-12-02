import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class VednorService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(Constants.VENDOR_URL).toPromise();
  }

  addVendor(body) {
    return this.http.post(Constants.ADD_VENDOR_URL, body).toPromise();
  }
}
