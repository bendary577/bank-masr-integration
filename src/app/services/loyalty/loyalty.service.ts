import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Constants } from 'src/app/models/constants'

@Injectable({
  providedIn: 'root',
})
export class LoyaltyService {
  token = localStorage.getItem('auth_token')

  constructor(private http: HttpClient) {}

  getAllAppGroups(status) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_ALL_APP_GROUPS_URL + '?status=' + status,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  getGenericGroup() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(Constants.GET_GENERIC_GROUP, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  getAppGroups(isParent, groupId, status: number) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_APP_GROUPS_URL +
        '?isParent=' +
        isParent +
        '&parentId=' +
        groupId +
        '&status=' +
        status,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  countUsers() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_USERS_COUNT_URL,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  getAppUser(id) {
    return this.http.get(Constants.GET_APP_USER + '/' + id, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  addAppGroups(
    flage,
    name,
    description,
    discountId,
    parentGroupId,
    image,
    groupId,
  ) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('discountId', discountId)
    formData.append('parentGroupId', parentGroupId)
    formData.append('image', image)
    formData.append('groupId', groupId)
    return this.http
      .post(Constants.ADD_APP_GROUP_URL + '?addFlag=' + flage, formData, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }

  deleteAppGroups(flage, groups, withUsers, parentGroupId) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(
        Constants.Delete_APP_GROUPS_URL +
          '?addFlag=' +
          flage +
          '&withUsers=' +
          withUsers +
          '&parentGroupId=' +
          parentGroupId,
        groups,
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
        },
      )
      .toPromise()
  }

  getTopGroups() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(Constants.GET_TOP_Groups_URL, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAppUsers() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_APP_USERS_URL,{
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  getAppUsersPaginated(pageNumber, limit) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_APP_USERS_PAGINATED_URL+'?pageNumber='+pageNumber+'&limit='+limit,
       {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  getTopUsers() {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(Constants.GET_TOP_USERS_URL, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
    })
  }

  addApplicationUser(
    flage,
    isGeneric,
    name,
    email,
    group,
    image,
    userId,
    accompiendUsers,
    cardCode,
    mobile,
    balance,
    expire,
    sendEmail,
    sendSMS,
  ) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('groupId', group)
    formData.append('image', image)
    formData.append('userId', userId)
    formData.append('cardCode', cardCode)
    formData.append('mobile', mobile)
    formData.append('balance', balance)
    formData.append('expiryDate', expire)
    formData.append('sendEmail', sendEmail)
    formData.append('sendSMS', sendSMS)
    formData.append('accompaniedGuests', JSON.stringify(accompiendUsers))
    return this.http
      .post(
        Constants.ADD_APP_USER_URL +
          '?addFlag=' +
          flage +
          '&isGeneric=' +
          isGeneric,
        formData,
        { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
      )
      .toPromise()
  }

  resendQRCode(userId) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData()
    formData.append('userId', userId)
    return this.http
      .post(Constants.RESEND_QR_CODE, formData, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }

  deleteAppUsers(flage, users) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(Constants.Delete_APP_USERS_URL + '?addFlag=' + flage, users, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }),
      })
      .toPromise()
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  countTransactions(transactionType, fromDate, toDate, group) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_TRANSACTION_COUNT_URL +
        '?transactionType=' +
        transactionType +
        '&fromDate=' +
        fromDate +
        '&toDate=' +
        toDate +
        '&group=' +
        group,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  getTransactions(transactionType, fromDate, toDate, group, pageNumber, limit) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_TRANSACTION_URL +
        '?transactionType=' +
        transactionType +
        '&fromDate=' +
        fromDate +
        '&toDate=' +
        toDate +
        '&group=' +
        group +
        '&pageNumber=' +
        pageNumber +
        '&limit=' +
        limit,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  getTotalSpend(date) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_TOTAL_SPEND_URL +
        '?transactionType=' +
        Constants.REDEEM_VOUCHER +
        '&dateFlag=' +
        date,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  getTotalTransInRang(startTime, endTime, group) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_TOTAL_TRANS_INRANG_URL +
        '?transactionType=' +
        Constants.REDEEM_VOUCHER +
        '&startTime=' +
        startTime +
        '&endTime=' +
        endTime +
        '&group=' +
        group,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  chargeWallet(chargeFlag, userId, balance) {
    let token = localStorage.getItem('auth_token')
    return this.http.post(
      Constants.CHARGE_WALLET + '?userId=' + userId,
      balance,
      { headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }) },
    )
  }

  deductWallet(chargeFlag, userId, amount) {
    let token = localStorage.getItem('auth_token')
    return this.http.post(
      Constants.DEDUCT_WALLET + '?userId=' + userId + '&amount=' + amount,
      {},
      { headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }) },
    )
  }

  undoWalletAction(userId, actionId) {
    let token = localStorage.getItem('auth_token')
    return this.http.post(
      Constants.UNDO_WALLET_ACTION + '?userId=' + userId + '&actionId=' + actionId,
      {},
      { headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }) },
    )
  }

  getWalletsTotalRemaining(fromDate, toDate) {
    this.token = localStorage.getItem('auth_token')
    return this.http.get(
      Constants.GET_WALLETS_REMAINING_TOTAL +
        '?fromDate=' +
        fromDate +
        '&toDate=' +
        toDate,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
    )
  }

  sendSmsOrEmail(user, process) {
    let token = localStorage.getItem('auth_token')
    return this.http.post(
      Constants.SEND_EMAIL_SMS + '?process=' + process,
      user,
      { headers: new HttpHeaders({ Authorization: 'Bearer' + token }) },
    )
  }

  suspendGuest(guestId: string, susFlag) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .post(
        Constants.SUSPEND_GEUST_URL +
          '?susFlag=' +
          susFlag +
          '&userId=' +
          guestId,
        {},
        {
          headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
        },
      )
      .toPromise()
  }

  getTransactionPages() {
    return this.http
      .get(Constants.GET_TRANSACTION_PAGINATED + '?page=' + 0 + '&size=' + 10, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      })
      .toPromise()
  }

  getVouchers() {
    return this.http.get(
      Constants.GET_VOUCHER_PAGES + '?page=' + 0 + '&size=' + 10,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      },
    )
  }

  getVoucherByID(parentVoucherId) {
    return this.http.get(
      Constants.GET_VOUCHER_BY_ID + '?voucherId=' + parentVoucherId,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      },
    )
  }

  addVoucher(voucher) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .post(Constants.ADD_VOUCHER_PAGES, voucher, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      })
      .toPromise()
  }

  updateVoucher(voucher) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(Constants.UPDATE_VOUCHER_PAGES, voucher, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      })
      .toPromise()
  }

  deleteVoucher(vouchers: any[]) {
    this.token = localStorage.getItem('auth_token')
    return this.http
      .put(Constants.MARK_VOUCHER_DELETE_PAGES, vouchers, {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      })
      .toPromise()
  }
  simphonyVoucherTrans(voucherId, currentVoucherCode, page, size) {
    return this.http.get(
      Constants.GET_VOUCHER_TRANSACTION_PAGES +
        '?page=' +
        page +
        '&size=' +
        size +
        '&voucherId=' +
        voucherId +
        '&voucherCode=' +
        currentVoucherCode,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      },
    )
  }

  getVoucherStatic(voucherId, currentVoucherCode) {
    return this.http.get(
      Constants.GET_VOUCHER_TRANSACTION_STATISTICS +
        '?voucherCode=' +
        currentVoucherCode +
        '&voucherId=' +
        voucherId,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer' + this.token }),
      },
    )
  }
}
