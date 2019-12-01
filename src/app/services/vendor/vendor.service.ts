import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class VednorService {

  constructor(private http: HttpClient) { }

  getData() {
    const body = {};
    this.http.post(Constants.VENDOR_URL, body);
  }
}
