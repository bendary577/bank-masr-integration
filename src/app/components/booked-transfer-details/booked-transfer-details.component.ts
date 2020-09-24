import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { MatSnackBar } from '@angular/material';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-booked-transfer-details',
  templateUrl: './booked-transfer-details.component.html',
  styleUrls: ['./booked-transfer-details.component.scss']
})
export class BookedTransferDetailsComponent implements OnInit {
  loading = true;
  transferDetailsLink = "";
  transferDetails = [];

  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService, private sidNav: SidenavResponsive,
     private transferService: TransferService, private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.transferDetailsLink = this.route.snapshot.params["transfer"];
    this.getBookedTransferDetails();
  }

  back() {
    this.router.navigate([Constants.BOOKED_TRANSFER_PAGE]);
  }

  getBookedTransferDetails() {
    this.spinner.show();

    this.transferService.getBookedTransferDetails(this.transferDetailsLink).toPromise().then((res: any) => {
      this.transferDetails = res.details;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {

      let message = "";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
         this.sidNav.Logout();
      } else if (err.error.message){
        message = err.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      
      this.spinner.hide();
      this.loading = false;
    });
  }

}
