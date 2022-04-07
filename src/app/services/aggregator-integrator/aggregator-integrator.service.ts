import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AggregatorsEndPoints } from 'src/app/models/deliveryAggregator/aggregatorsEndPoints';

@Injectable({
  providedIn: 'root'
})
export class AggregatorIntegratorService {


  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getTalabatOrders() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_TALABAT_ORDERS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  sendTalabatOrders() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.SEND_TALABAT_ORDERS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTalabatBranchOrders(branch) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_TALABAT_BRANCH_ORDERS + "?branch=" + branch,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getTalabatOrderDetails(order) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(AggregatorsEndPoints.GET_TALABAT_ORDER_DETAILS, order ,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }
  
  getAggregatorProducts() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_AGGREGATOR_PRODUCTS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

}
