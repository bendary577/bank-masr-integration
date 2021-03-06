import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Constants } from 'src/app/models/constants'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  token = localStorage.getItem('auth_token')

  constructor(private http: HttpClient) {}

  getAccount() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(Constants.GET_ACCOUNT, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  addAccount(account) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .post(Constants.ADD_ACCOUNT, account, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }

  updateAccount(account) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(Constants.UPDATE_ACCOUNT, account, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }

  updateAccountSyncTypes(account) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(Constants.UPDATE_ACCOUNT_SYNC_TYPES, account, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }

  getAccountFeature(accountId) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .get(Constants.GET_FEATURES + '?accountId=' + accountId, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      })
      .toPromise()
  }

  getRoles(userId: any, sameUser: Boolean) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .get(
        Constants.GET_ROLES + '?userId=' + userId + '&sameUser=' + sameUser,
        { headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }) },
      )
      .toPromise()
  }

  updateUserRoles(userId: any, rolesId) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .post(
        Constants.UPDATE_USER_ROLES +
          '?userId=' +
          userId ,
        rolesId,
        { headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }) },
      )
      .toPromise()
  }
}
