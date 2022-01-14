import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';

@Injectable({
  providedIn: 'root'
})
export class RewardPointsService {

  token = localStorage.getItem('auth_token')

  constructor(private http: HttpClient) {}

  addRewardPointsUser(
    image,
    user
  ) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData()
    formData.append('image', image)
    formData.append('user', JSON.stringify(user))
    return this.http
      .post(
        Constants.ADD_RP_USER_URL,
        formData,
        { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
      )
      .toPromise()
  }

  updateRewardPointsUser(
    image,
    user
  ) {
    this.token = localStorage.getItem('auth_token')
    const formData: FormData = new FormData()
    formData.append('image', image)
    formData.append('user', JSON.stringify(user))
    return this.http
      .post(
        Constants.UPDATE_RP_USER_URL,
        formData,
        { headers: new HttpHeaders({ Authorization: 'Bearer ' + this.token }) },
      )
      .toPromise()
  }
}
