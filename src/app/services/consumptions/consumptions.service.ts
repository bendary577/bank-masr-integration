import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionsService {
  
  constructor(private http: HttpClient) { }
  @Cacheable()
  getConsumptions() {
    return this.http.get(Constants.GET_CONSUMPTION_URL);
  }

  getConsumptionsDB() {
    return this.http.get(Constants.GET_CONSUMPTION_DB_URL);
  }
}
