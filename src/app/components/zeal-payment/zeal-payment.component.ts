import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZealPayment } from 'src/app/models/zeal-payment';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { OperationService } from 'src/app/services/operation/operation.service';
import { Operation } from 'src/app/models/operation';

@Component({ 
  selector: 'app-zeal-payment',
  templateUrl: './zeal-payment.component.html',
  styleUrls: ['./zeal-payment.component.scss']
})
export class ZealPaymentComponent implements OnInit {

  loading = true;
  static getMenuItemsLoading = false;
  success = null;
  operations = [];
  operationData = [];
  data = [];
  selectedOperation: Operation = null;
  state = "";

  constructor(private operationService: OperationService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
              public snackBar: MatSnackBar, private menuItemService: MenuItemsService) { }

  ngOnInit() {
      this.getOperations(Constants.ZEAL_PAYMENT_OPERATION);
  }


  get staticgetMenuItemsLoading() {
    return MenuItemsComponent.getMenuItemsLoading ;
  }

  getOperations(opeartionTypeName: string) {
    this.spinner.show();
    this.operationService.getOperation(opeartionTypeName).toPromise().then((res: any) => {
      this.operations = res;
      this.selectedOperation = this.operations[0];
      if (this.operations.length > 0) {
        this.getOperationData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getOperationData() {
    this.spinner.show();

    this.operationService.getOperationDataById(this.selectedOperation["id"]).toPromise().then((res: any) => {
      this.operationData = [res];
      this.data = res["data"];

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }
}
