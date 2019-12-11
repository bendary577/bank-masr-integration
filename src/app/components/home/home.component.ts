import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = true;
  dataSource = [];
  constructor(private spinner: NgxSpinnerService, private vendorService: VendorService,
    public dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.vendorService.getData().toPromise().then((res: any) => {
      // console.log(res.data);
      this.dataSource = res.data;
      this.vendorService.vendorAccountIDS = [];
      for (const element of this.dataSource) {
        this.vendorService.vendorAccountIDS.push(element.vendor_account);
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddVendorComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.vendorAccount && res.name) {
        this.spinner.show();
        this.vendorService.addVendor(res).then(result => {
          this.getData();
        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'right',
          });
        });
      }
    });
  }

}
