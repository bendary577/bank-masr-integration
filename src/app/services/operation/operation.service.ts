import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { Operation } from 'src/app/models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getOperation(operationTypeName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get<Operation[]>(Constants.GET_OPERATION_URL + '?typeName=' + operationTypeName,
     { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

}
