import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class PDFServiceService {

  token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) { }
  
  exportVoucherCode(voucher: any) {
    this.token = localStorage.getItem('auth_token');
    return this.http.post(Constants.EXPORT_VOUCHER_CODE_PDF ,voucher ,
       { headers: new HttpHeaders({Authorization: 'Bearer ' + this.token}), responseType: 'blob'});
  }
}
