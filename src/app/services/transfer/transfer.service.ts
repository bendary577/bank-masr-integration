import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  @Cacheable()
  getBookedTransfer() {
    return this.http.get(Constants.GET_BOOKED_TRANSFER_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getBookedTransferDB() {
    return this.http.get(Constants.GET_BOOKED_TRANSFER_DB_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
  
  @Cacheable()
  getBookedTransferDetails(transferLink:String) {
    return this.http.get(Constants.GET_BOOKED_TRANSFER_DETAILS_URL + '?transferLink=' + transferLink, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
