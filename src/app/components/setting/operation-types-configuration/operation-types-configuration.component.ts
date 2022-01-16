import { Component, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-operation-types-configuration',
  templateUrl: './operation-types-configuration.component.html',
  styleUrls: ['./operation-types-configuration.component.scss']
})
export class OperationTypesConfigurationComponent implements OnInit {
  operationTypes: SyncJobType[] = [];
  loading = true;

  constructor(
     private router: Router,
     private spinner: NgxSpinnerService,
     private operationTypeService: OperationTypesService) { }

  ngOnInit() {
    this.getOperationTypes();
  }

  getOperationTypes(){
    this.loading = true
    this.spinner.show();

    this.operationTypeService.getOperationTypes().toPromise().then((res: any) => {
      this.operationTypes = res;
      this.spinner.hide();
      this.loading = false

    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false
    });
  }

  openDialog(operationType){
    if (operationType.name == Constants.CREATE_ORDER_OPERATION) {
        this.router.navigate([Constants.CREATE_ORDER_CONFIG_PAGE]);
    }

    if (operationType.name == Constants.ZEAL_PAYMENT_OPERATION) {
      this.router.navigate([Constants.ZEAL_PAYMENT_CONFIG_PAGE]);
    }
    
    console.log(Constants.ZEAL_VOUCHER_OPERATION)

    if (operationType.name == Constants.ZEAL_VOUCHER_OPERATION) {
    this.router.navigate([Constants.ZEAL_VOUCHER_CONFIG_PAGE]);
    }

    if (operationType.name == Constants.ZEAL_POINTS_OPERATION) {
      this.router.navigate([Constants.ZEAL_POINTS_CONFIG_PAGE]);
    }

    if (operationType.name == Constants.OPERA_PAYMENT_OPERATION) {
      this.router.navigate([Constants.OPERA_PAYMENT_CONFIG_PAGE]);
    }
  }

}
