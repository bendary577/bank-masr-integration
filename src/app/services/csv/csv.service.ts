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
    return this.http.get<Blob>(Constants.EXPORT_CSV_SALES + '?syncJobId=' + syncJobID , 
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}),
     observe: 'response',
    responseType: 'blob' as 'json'});
  }

  generateSingleFile(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<Blob>(Constants.GENERATE_SINGLE_FILE_SALES + "?syncJobTypeName=" + syncJobTypeName , 
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}),
     observe: 'response',
    responseType: 'blob' as 'json'});
  }

  listSalesSyncFiles() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.LIST_SYNC_FILE_SALES , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
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
