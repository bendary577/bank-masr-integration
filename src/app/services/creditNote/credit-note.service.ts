import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {
  token = localStorage.getItem('auth_token');

  constructor(private http : HttpClient) { }

  getCreditNote() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_CREDIT_NOTE_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

  getCreditNoteDB() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_CREDIT_NOTE_DB_URL, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})});
  }

}
