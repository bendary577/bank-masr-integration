import { Component, OnInit } from '@angular/core';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { NgxSpinnerService } from 'ngx-spinner';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { Constants } from 'src/app/models/constants';
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service';

@Component({
  selector: 'app-create-order-config',
  templateUrl: './create-order-config.component.html',
  styleUrls: ['./create-order-config.component.scss']
})
export class CreateOrderConfigComponent implements OnInit {

  loading = true;
  operationType: AccountSyncType;

  constructor( private operationService:OperationTypesService,
   private router:Router, public snackBar: MatSnackBar) { }

 ngOnInit() {
   this.getOperationType();
 }

 getOperationType() {
   this.loading = true;
   this.operationService.getOperationTypesByName(Constants.CREATE_ORDER_OPERATION).toPromise().then((res: any) => {
     this.operationType = res;

     this.loading = false;
   }).catch(err => {
     console.error(err);
     this.loading = false;
   });
 }

  onCancelClick() {
    this.router.navigate([Constants.OPERATION_TYPES]);
  }

}
