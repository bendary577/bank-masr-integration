import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { Operation } from 'src/app/models/operation';
import { OperationService } from 'src/app/services/operation/operation.service';
import { ZealVoucher } from 'src/app/models/zeal-voucher';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

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
      this.getOperations(Constants.CREATE_ORDER_OPERATION);
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
      this.operationData.push(res);
      this.data = res["data"];

      console.log({
        operationData: this.operationData
      });
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }
}
