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
    return this.http.get(Constants.GET_SUPPLIERS_URL + '?limit=10', { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSyncJobTypesDB() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobType[]>(Constants.GET_SYNC_JOB_TYPES_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSyncJobTypeDB(syncJobTypeName:String) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobType>(Constants.GET_SYNC_JOB_TYPES_BY_NAME_URL + '?typeName=' + syncJobTypeName, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  updateSyncJobTypeConfig(SyncJobType){
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_SYNC_JOB_TYPES_URL , SyncJobType, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).toPromise();
  }

  updateCostCenterLocationMapping(costCenters){
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_COST_CENTER_MAPPING_URL , costCenters, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})}).toPromise();
  }

  @Cacheable()
  getSyncJobs(syncJobTypeName:String){
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOBS_URL + '?typeName=' + syncJobTypeName, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSyncJobDataById(syncJobId:String){
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOB_DATA_BY_ID + '?syncJobId=' + syncJobId, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getSyncJobData(syncJobTypeName:String){
    this.token = localStorage.getItem('auth_token');
    return this.http.get<SyncJobData[]>(Constants.GET_SYNC_JOB_DATA + '?syncJobTypeName=' + syncJobTypeName, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }
}
