import { Component, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-operation-types-configuration',
  templateUrl: './operation-types-configuration.component.html',
  styleUrls: ['./operation-types-configuration.component.scss']
})
export class OperationTypesConfigurationComponent implements OnInit {
  operationTypes: SyncJobType[] = [];
  loading = true;

  constructor(private sidNav: SidenavResponsive, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService,
     private operationTypeService: OperationTypesService) { }

  ngOnInit() {
    this.getOperationTypes();
  }

  getOperationTypes(){
    this.loading = true
    this.spinner.show();

    this.operationTypeService.getOperationTypes().toPromise().then((res: any) => {
      this.operationTypes = res;
      console.log({
        operationTypes: this.operationTypes
      })
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
  }

}