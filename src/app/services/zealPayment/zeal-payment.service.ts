import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';
import { Observable } from 'rxjs';
import { ZealPayment } from 'src/app/models/zeal-payment';
import { ZealPoints } from 'src/app/models/zeal-points';
import { ZealVoucher } from 'src/app/models/zeal-voucher';

@Injectable({
  providedIn: 'root'
})
export class ZealPaymentService {

  constructor(private http: HttpClient) { }

  zealPaymentHistory(): Observable<ZealPayment[]>{    
    return this.http.get<ZealPayment[]>(Constants.GET_ZEALPAYMENT_URL);
  }

  zealPointsHistory(): Observable<ZealPoints[]>{    
    return this.http.get<ZealPoints[]>(Constants.GET_ZEALPOINTS_URL);
  }

  zealVoucherHistory(): Observable<ZealVoucher[]>{    
    return this.http.get<ZealVoucher[]>(Constants.GET_ZEALVOUCHER_URL);
  }

}
