import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  exportInvoicesToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_APPROVED_INVOICES + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportSalesToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_SALES + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportTransfersToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_BOOKED_TRANSFERS + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportWastageToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_WATAGE + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

  exportConsumptionToCSV(syncJobID) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.EXPORT_CSV_CONSUMPTION + '?syncJobId=' + syncJobID , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }

}
