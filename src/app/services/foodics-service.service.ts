import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AggregatorsEndPoints } from 'src/app/models/deliveryAggregator/aggregatorsEndPoints';

@Injectable({
  providedIn: 'root'
})
export class FoodicsServiceService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }

  getFoodicsProducts(pageNumber, limit) {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_FOODICS_PRODUCTS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getMappedProducts() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_MAPPED_PRODUCTS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  getUnMappedProducts() {
    this.token = localStorage.getItem('auth_token');
    return this.http.get(AggregatorsEndPoints.GET_UNMAPPED_PRODUCTS,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

  authorizeFoodicsAccount(clientId, randomString) {
    window.open(AggregatorsEndPoints.AUTHORIZE_FOODICS_ACCOUNT+ "?client_id=" + clientId+'&state='+randomString,
                    "", "width=800, height=800");
    // this.token = localStorage.getItem('auth_token');
    return this.http.post(AggregatorsEndPoints.AUTHORIZE_FOODICS_ACCOUNT+ "?client_id=" + clientId+'&state='+randomString, {});
  }

  requestFoodicsAccessToken(body){
    this.token = localStorage.getItem('auth_token');
    return this.http.post(AggregatorsEndPoints.REQUEST_FOODICS_ACCESS_TOKEN,body,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})});
  }

}
