import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { saveAs } from 'file-saver'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Constants } from 'src/app/models/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { PDFServiceService } from 'src/app/services/pdf-service/pdfservice.service';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { Location } from '@angular/common'

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  voucherList = {
    messages: { emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no voucher yet.</span>
    </div> `,},
    selected: [], groupsCount: 0 as number, pagesFilter: [10, 25, 50, 75, 100],  showLoading: true,
     inputSearch: '' as string,  voucherData: [] , offset: 0 ,    paginateData: true as boolean,
  }

  constructor(public snackBar: MatSnackBar, private sidNav: SideNaveComponent, public dialog: MatDialog, 
    private _location: Location, private loyaltyService: LoyaltyService, private router: Router, public data: Data,
    private spinner: NgxSpinnerService,private pdfService: PDFServiceService) {
     }

  ngOnInit() {
    this.getVoucherList();
  }

  refresh() {
    location.reload()
  }

  openVoucherTransactions(voucher) {
      // this.data.storage = voucher
      localStorage.setItem("currentVoucherId", voucher.id);
      this.router.navigate([Constants.VOUCHER_TRANSACTION])
  }

  onSelect({ selected }) {
    this.voucherList.selected.splice(0, this.voucherList.selected.length)
    this.voucherList.selected.push(...selected)
  }

  getVoucherList() {
    this.voucherList.showLoading = true
    this.loyaltyService.getVouchers()
      .toPromise()
      .then((res: any) => {
        this.voucherList.voucherData = res["data"]
        this.voucherList.showLoading = false
      })
      .catch((err) => {
        this.voucherList.showLoading = false
      })
  }

  addVoucherDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { title:  "Add Voucher", };
    dialogConfig.width = '420px';
    dialogConfig.maxHeight = '650px';
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddVoucherDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.voucherList.showLoading = true
        this.loyaltyService.addVoucher(res).then((result: any) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            this.snackBar.open(result.message, null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
              this.sidNav.Logout()
            } else if (err.error.message) {
              message = err.error.message
            } else if (err.message) {
              message = err.message
            } else {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }
            this.snackBar.open(message, null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          })
      }
    })
  }

  updateVoucherDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 
      title:  "Upadte Voucher",
      voucher: this.voucherList.selected[0] };
    dialogConfig.width = '420px';
    dialogConfig.maxHeight = '650px';
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddVoucherDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.voucherList.showLoading = true
        this.loyaltyService.updateVoucher(res).then((result: any) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            this.snackBar.open(result.message, null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
              this.sidNav.Logout()
            } else if (err.error.message) {
              message = err.error.message
            } else if (err.message) {
              message = err.message
            } else {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }
            this.snackBar.open(message, null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          })
      }
    })
  }

  openConfirmationDeleteRestore(restorefalge) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 
      title:  "Upadte Voucher",
      voucher: this.voucherList.selected[0] };
    dialogConfig.width = '500px';
    dialogConfig.maxHeight = '650px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    var message = "";
    if(restorefalge){
    this.voucherList.selected[0].deleted = false;
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to restore selected vouchers ?"
    message = "Voucher restored successfully."
    }else{
      this.voucherList.selected[0].deleted = true;
      dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete selected vouchers ?"
      message = "Voucher deleted successfully."
    }
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.voucherList.showLoading = true
        this.loyaltyService.deleteVoucher(this.voucherList.selected[0]).then((result: any) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            this.snackBar.open(message, null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.voucherList.showLoading = false
            this.voucherList.selected = []
            this.getVoucherList()
            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
              this.sidNav.Logout()
            } else if (err.error.message) {
              message = err.error.message
            } else if (err.message) {
              message = err.message
            } else {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }
            this.snackBar.open(message, null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          })
       }
    });
  }

  extractVoucherCodePDF() {
    this.spinner.show()
    this.pdfService.exportVoucherCode(this.voucherList.selected[0])
      .subscribe(
        (res) => {
          const blob = new Blob([res], { type: 'application/pdf' })
          const file = new File([blob], this.voucherList.selected[0].name + ' Code' + '.pdf', {
            type: 'application/pdf',
          })
          saveAs(file)

          this.snackBar.open('Export Successfully', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
          this.spinner.hide()
        },
        (err) => {
          this.spinner.hide()
          console.error(err)
          this.snackBar.open('Fail to export, Please try agian', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        },
      )
  }

  validateUpdateVoucher() {
    if (this.voucherList.selected.length != 1) {
      return true
    }

    if (this.voucherList.selected.length == 1) {
      let updatedGroup = this.voucherList.selected[0] 

      if (updatedGroup.deleted) {
        return true
      }
    }

    return false
  }

  validateAddVoucher() {
     return false
  }

  validateDeleteVoucher() {
    if (this.voucherList.selected.length != 1) {
      return true
    }

    // check if there any deleted groups selected
    var i
    for (i = 0; i < this.voucherList.selected.length; i++) {
      let selectedGroup = this.voucherList.selected[i]

      if (selectedGroup.deleted) {
        return true
      }
    }
    return false
  }

  validateRestoreVoucher() {
    if (this.voucherList.selected.length == 0) {
      return true
    }

    // check if there any deleted groups selected
    var i
    for (i = 0; i < this.voucherList.selected.length; i++) {
      let selectedGroup = this.voucherList.selected[i]
      if (!selectedGroup.deleted) {
        return true
      }
    }
    return false
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }
}
