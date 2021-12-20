import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Feature } from 'src/app/models/Feature';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  loading = false;
  accountID = "";
  features: Feature[] = [];

  constructor(private spinner: NgxSpinnerService,
     public snackBar: MatSnackBar,
     public accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccountFeatures();
  }

  getAccountFeatures(){
    this.loading = false;
    this.spinner.show();

    this.accountID = JSON.parse(localStorage.getItem('account')).id;

    this.accountService.getAccountFeature(this.accountID).then((res: any) => {
      if (res.data && res.data != null) {
        this.features = res.data;
      }

      this.loading = false;
      this.spinner.hide();
    }).catch(err => {
      console.log(err);
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.loading = false;
      this.spinner.hide();
    })
  }

}
