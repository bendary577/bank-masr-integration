import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  constructor(private http : HttpClient) { }

  @Cacheable()
  getCreditNote() {
    return this.http.get(Constants.GET_CREDIT_NOTE_URL);
  }

  getCreditNoteDB() {
    return this.http.get(Constants.GET_CREDIT_NOTE_DB_URL);
  }

}
