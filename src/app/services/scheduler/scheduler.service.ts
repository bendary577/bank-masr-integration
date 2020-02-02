import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getCurrentDays() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_CURRENT_DAYS_URL);
  }


}
