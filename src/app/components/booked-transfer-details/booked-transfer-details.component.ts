import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booked-transfer-details',
  templateUrl: './booked-transfer-details.component.html',
  styleUrls: ['./booked-transfer-details.component.scss']
})
export class BookedTransferDetailsComponent implements OnInit {

  transferDetails = []

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.transferDetails = this.route.snapshot.params["transfer"];
    console.log(this.transferDetails);
  }

}
