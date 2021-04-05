import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class NewBookingReportService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getNewBooking() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.SYNC_OPERA_NEW_BOOKING_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getCancelBooking() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.SYNC_OPERA_CANCEL_BOOKING_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getOccupancyUpdates() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.SYNC_OPERA_OCCUPANCY_UPDATE_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
}
