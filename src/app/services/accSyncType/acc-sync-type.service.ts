import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';


@Injectable({
  providedIn: 'root'
})
export class AccSyncTypeService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  @Cacheable()
  getAccSyncJobType(syncJobTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_ACC_SYNC_JOB_TYPES_BY_NAME_URL + '?typeName=' + syncJobTypeName
     , { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
}
