import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { SyncJob } from 'src/app/models/SyncJob';
import { SyncJobData } from 'src/app/models/SyncJobData';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class SyncJobService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getSuppliersSyncJob() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_SUPPLIERS_URL + '?limit=10', { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getSyncJobTypesDB() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobType[]>(Constants.GET_SYNC_JOB_TYPES_URL,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getApplications() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<any>(Constants.GET_APPLICATION_URL,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getSyncJobTypeDB(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobType>(Constants.GET_SYNC_JOB_TYPES_BY_NAME_URL + '?typeName=' + syncJobTypeName,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  updateSyncJobTypeConfig(syncJobType) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_SYNC_JOB_TYPES_URL , syncJobType,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  updateCostCenterLocationMapping(costCenters) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_COST_CENTER_MAPPING_URL , costCenters,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }

  getSyncJobs(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOBS_URL + '?typeName=' + syncJobTypeName,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getOperation(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJob[]>(Constants.GET_OPERATION_JOBS_URL + '?typeName=' + syncJobTypeName,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getSyncJobDataById(syncJobId: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOB_DATA_BY_ID + '?syncJobId=' + syncJobId,
    { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getSyncJobData(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobData[]>(Constants.GET_SYNC_JOB_DATA + '?syncJobTypeName=' + syncJobTypeName,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  clearSyncJobData() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<boolean>(Constants.CLEAR_SYNC_JOB_DATA,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getSyncJobDataByBookingNo(bookingNo: string, bookingStatus: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobData[]>(Constants.GET_SYNC_JOB_DATA_BY_BOOKING_NO + '?bookingNo=' + bookingNo + '&bookingStatus=' + bookingStatus,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  /*
  dateRange, email, loation, moduleId
  
    const formData: FormData = new FormData();
    formData.append('dateRange', dateRange);
    formData.append('email', email);
    formData.append('store', loation);
    formData.append('moduleId', moduleId);
  */
  getExportedfiles(exportRequest){
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.GET_EXPORTED_FILE , exportRequest, {headers: new HttpHeaders({Authorization: 'Bearer' + this.token})} )
  }

}
