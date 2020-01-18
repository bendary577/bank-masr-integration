import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-booked-transfer-details',
  templateUrl: './booked-transfer-details.component.html',
  styleUrls: ['./booked-transfer-details.component.scss']
})
export class BookedTransferDetailsComponent implements OnInit {
  loading = true;
  transferDetailsLink = "";
  transferDetails = [];

  constructor(private route:ActivatedRoute, private spinner: NgxSpinnerService,
     private transferService: TransferService, private router:Router) { }

  ngOnInit() {
    this.transferDetailsLink = this.route.snapshot.params["transfer"];
    this.getBookedTransferDetails();
  }

  back(){
    this.router.navigate([Constants.BOOKED_TRANSFER_PAGE]);
  }

  getBookedTransferDetails() {
    this.spinner.show();

    this.transferService.getBookedTransferDetails(this.transferDetailsLink).toPromise().then((res: any) => {
      this.transferDetails = res.details;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

}
