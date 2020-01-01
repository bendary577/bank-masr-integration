import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
     private transferService: TransferService) { }

  ngOnInit() {
    this.transferDetailsLink = this.route.snapshot.params["transfer"];
    console.log(this.transferDetailsLink);
    this.getBookedTransferDetails();
  }

  getBookedTransferDetails() {
    this.spinner.show();

    this.transferService.getBookedTransferDetails(this.transferDetailsLink).toPromise().then((res: any) => {
      this.transferDetails = res.details;
      console.log(this.transferDetails);

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

}
