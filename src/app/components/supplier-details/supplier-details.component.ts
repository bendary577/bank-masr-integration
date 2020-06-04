import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

  supplier :any;


  constructor(public snackBar: MatSnackBar,
    private router: Router, private data: Data) {

  }

  ngOnInit() {
    this.supplier = this.data.storage["data"]
  }

  back() {
    this.router.navigate([Constants.SUPPLIERS_PAGE]);
  }
}
