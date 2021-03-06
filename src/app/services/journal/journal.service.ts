import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { ConsumptionLocation } from 'src/app/models/ConsumptionLocation';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  @Cacheable()
  getOverGroups(syncJobType) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_OVER_GROUPS_URL + "?syncJobType=" + syncJobType,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  mapItemGroups() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.MAP_ITEM_GROUPS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getJournals() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_JOURNALS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getCostOfGoods() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_COST_OF_GOODS_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  addMajorGroup(majorGroups: MajorGroup[], id:string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.ADD_JOURNAL_GROUP_URL + "?syncJobTypeId=" + id, majorGroups, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  updateConsumptionLocations(locations: ConsumptionLocation[], id:string, updateLocation:boolean) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_CONSUMPTION_LOCATIONS_URL + "?syncJobTypeId=" + id + "&updateLocation=" + updateLocation, locations, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

}
