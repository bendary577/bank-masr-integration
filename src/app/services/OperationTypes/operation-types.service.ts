import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class OperationTypesService {
  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getOperationTypes() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_OPERATION_TYPES_URL, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getOperationTypesByName(operationName: string) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(Constants.GET_OPERATION_TYPE_BY_NAME_URL + "?operationName=" + operationName, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  updateOperationTypeConfig(operationType) {
    this.token = localStorage.getItem('auth_token');
    return this.http.put(Constants.UPDATE_OPERATION_TYPE_URL , operationType, { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})}).toPromise();
  }
}
