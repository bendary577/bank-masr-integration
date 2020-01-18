import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  constructor(private http: HttpClient) { }

  getOverGroups() {
    return this.http.get(Constants.GET_OVER_GROUPS_URL);
  }

  mapItemGroups() {
    return this.http.get(Constants.MAP_ITEM_GROUPS_URL);
  }

  getJournals(user) {
    return this.http.get(Constants.GET_JOURNALS_URL);
  }

}
