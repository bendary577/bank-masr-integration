import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { SyncJob } from 'src/app/models/SyncJob';
import { Cacheable } from 'ngx-cacheable';

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
    return this.http.get<SyncJobType[]>(Constants.GET_SYNC_JOB_TYPES_URL);
  }

  updateSyncJobTypeConfig(SyncJobType:SyncJobType){
    return this.http.put(Constants.UPDATE_SYNC_JOB_TYPES_URL , SyncJobType).toPromise();
  }

  @Cacheable()
  getSyncJobs(syncJobTypeName:String){
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOBS_URL + '?typeName=' + syncJobTypeName);
  }

  getSyncJobData(syncJobId:String){
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOB_DATA + '?syncJobId=' + syncJobId);
  }
}
