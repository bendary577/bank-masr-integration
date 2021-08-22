import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Constants } from 'src/app/models/constants'

@Injectable({
  providedIn: 'root',
})
export class OperaPaymentService {

  token = localStorage.getItem('auth_token')

  constructor(private http: HttpClient) {}

  listOperaTransactions(fromDate, toDate, cardNumber) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.LIST_OPERA_TRANSACTIONS_URL + '?startDate=' +  fromDate +  '&endDate=' + toDate + "&cardNumber=" + cardNumber,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

    countOperaTransactions(fromDate, toDate) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.COUNT_OPERA_TRANSACTIONS_URL +
        '?startDate=' +
        fromDate +
        '&endDate=' +
        toDate,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

}
