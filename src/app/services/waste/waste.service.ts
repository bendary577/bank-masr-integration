import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private http: HttpClient) { }

  @Cacheable()
  getBookedWaste() {
    return this.http.get(Constants.GET_BOOKED_WASTE_URL);
  }

  getBookedWasteDB() {
    return this.http.get(Constants.GET_BOOKED_WASTE_DB_URL);
  }
}
