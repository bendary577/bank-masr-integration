import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-opera-payment-configuration',
  templateUrl: './opera-payment-configuration.component.html',
  styleUrls: ['./opera-payment-configuration.component.scss']
})
export class OperaPaymentConfigurationComponent implements OnInit {

  loading = true;
  operationType: AccountSyncType;

  constructor( private operationService:OperationTypesService,
   private router:Router, public snackBar: MatSnackBar,
   private spinner: NgxSpinnerService, private sidNav: SideNaveComponent) { }

 ngOnInit() {
   this.getOperationType();
 }

 getOperationType() {
   this.loading = true;
   this.operationService.getOperationTypesByName(Constants.OPERA_PAYMENT_OPERATION).toPromise().then((res: any) => {
     this.operationType = res;

     this.loading = false;
   }).catch(err => {
     console.error(err);
     this.loading = false;
   });
 }

 onSaveClick(): void {
  this.spinner.show();

  this.operationService.updateOperationTypeConfig(this.operationType).then(result => {
    this.snackBar.open('Save configuration successfully.', null, {
      duration: 2000,
      horizontalPosition: 'center',
      panelClass:"my-snack-bar-success"
    });
    this.spinner.hide();
    this.router.navigate([Constants.OPERATION_TYPES]);
    }
    ).catch(err => {
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.OPERATION_TYPES]);
  }
}
