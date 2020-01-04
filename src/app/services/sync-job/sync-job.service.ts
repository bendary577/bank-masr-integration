import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { SyncJob } from 'src/app/models/SyncJob';
import { Cacheable } from 'ngx-cacheable';
import { SyncJobData } from 'src/app/models/SyncJobData';

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

  getSyncJobs(syncJobTypeName:String){
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOBS_URL + '?typeName=' + syncJobTypeName);
  }

  getSyncJobDataById(syncJobId:String){
    return this.http.get<SyncJob[]>(Constants.GET_SYNC_JOB_DATA_BY_ID + '?syncJobId=' + syncJobId);
  }

  getSyncJobData(syncJobTypeName:String){
    return this.http.get<SyncJobData[]>(Constants.GET_SYNC_JOB_DATA + '?syncJobTypeName=' + syncJobTypeName);
  }
}
