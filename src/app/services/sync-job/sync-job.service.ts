import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SyncJobService {

  constructor(private http: HttpClient) { }

  getSuppliersSyncJob() {
    return this.http.get(Constants.GET_SUPPLIERS_URL + '?limit=10');
  }

  getSuppliersDB() {
    return this.http.get(Constants.GET_SUPPLIERS_DB_URL);
  }

  getSyncJobTypesDB() {
    return this.http.get(Constants.GET_SYNC_JOB_TYPES_URL);
  }
}
