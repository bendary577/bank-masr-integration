import { Component, OnInit } from '@angular/core'
import { MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { Data } from 'src/app/models/data'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { Location } from '@angular/common'
import { SideNaveComponent } from '../side-nave/side-nave.component'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-unique-voucher',
  templateUrl: './unique-voucher.component.html',
  styleUrls: ['./unique-voucher.component.scss']
})
export class UniqueVoucherComponent implements OnInit {

  voucher: any;
  parentVoucherId: any;

  constructor(
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
    public dialog: MatDialog,
    private _location: Location,
    private loyaltyService: LoyaltyService,
    private router: Router,
    public data: Data,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.parentVoucherId =  localStorage.getItem('currentVoucherId')
    this.getCurrentVoucher(this.parentVoucherId);

  }

  openVoucherTransactions(voucher) {
    localStorage.setItem("currentVoucherCode", voucher.code);
    this.router.navigate(["main/voucherTransaction"])
}


  getCurrentVoucher(parentVoucherId) {
    this.spinner.show();
    this.loyaltyService.getVoucherByID(parentVoucherId).toPromise().then((res: any) => {
        this.voucher = res["data"];
        this.spinner.hide();
      })
      .catch((err) => {
        this.spinner.hide();
      })
  }


}


