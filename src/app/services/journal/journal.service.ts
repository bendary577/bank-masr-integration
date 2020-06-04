import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

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

}
