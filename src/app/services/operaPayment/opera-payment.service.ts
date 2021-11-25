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
    const formData: FormData = new FormData();
    formData.append('startDate', fromDate);
    formData.append('endDate', toDate);
    formData.append('cardNumber', cardNumber);
    return this.http.post(
      Constants.LIST_OPERA_TRANSACTIONS_URL, formData,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  simphonyCheckPayment(fromDate, toDate, cardNumber) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData();
    formData.append('startDate', fromDate);
    formData.append('endDate', toDate);
    formData.append('cardNumber', cardNumber);
    return this.http.post(
      Constants.LIST_SIMPHONY_CHECK_PAYMENT_URL, formData,
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
