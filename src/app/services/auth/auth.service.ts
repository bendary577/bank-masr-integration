import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // login() {
  //   const formData = new FormData();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       // 'Accept-Encoding': 'gzip, deflate, br',
  //       // 'Content-Length': '2389',
  //       // 'Referer': 'https://mte03-ohim-prod.hospitality.oracleindustry.com/Webclient/FormLogin.aspx',
  //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
  //       // 'Sec-Fetch-Mode': 'navigate',
  //       // 'Sec-Fetch-Site': 'same-origin',
  //       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  //       // 'Access-Control-Allow-Origin': '*',
  //       // 'Access-Control-Expose-Headers': '*',
  //       // 'Access-Control-Allow-Headers': '*',
  //     }), withCredentials: true
  //   };
  //   formData.append('__EVENTTARGET', 'Login');
  //   formData.append('dfUsername', 'Amr');
  //   formData.append('dfUsername_p', 'Amr');
  //   formData.append('hdCompanyText', 'hdCompanyText');
  //   formData.append('hdCompany', 'gcs');
  //   formData.append('dfCompany', 'gcs');
  //   formData.append('dfCompany_p', 'gcs');
  //   formData.append('dfPassword', 'Mic@8000');
  //   formData.append('dfPassword_p', 'Mic@8000');
  //   formData.append('hdPassword', 'Mic@8000');
  //   this.http.post(Constants.LOGIN_URL, formData, httpOptions).subscribe((response: any) => {

  //     console.log('response.headers.keys(); ', response.headers.keys());
  //     console.log('response.body ', response.body);

  //   }, error => {
  //     console.error('error', error);
  //     console.error('error.error', error.error);
  //     console.error('error.headers', error.headers);
  //     console.error(' this.cookieValue = this.cookieService.get', this.cookie.get('JSESSIONID'));
  //   });
  // }
  login() {

    // let casper = require('casper').create();
    // casper.start('http://casperjs.org/');

    // casper.then( res => {
    //   console.log('First Page: ' );
    // });

    // casper.thenOpen('http://phantomjs.org', res2 => {
    //   console.log('Second Page: ' );
    // });

    // casper.run();
  }

}
