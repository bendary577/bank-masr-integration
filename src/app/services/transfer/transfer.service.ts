import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  @Cacheable()
  getBookedTransfer() {
    return this.http.get(Constants.GET_BOOKED_TRANSFER_URL);
  }

  getBookedTransferDB() {
    return this.http.get(Constants.GET_BOOKED_TRANSFER_DB_URL);
  }
}
