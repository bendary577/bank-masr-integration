import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CostCenterAccountCodeMapping } from 'src/app/models/CostCenterAccountCodeMapping';

@Component({
  selector: 'app-map-cost-center-account-code',
  templateUrl: './map-cost-center-account-code.component.html',
  styleUrls: ['./map-cost-center-account-code.component.scss']
})
export class MapCostCenterAccountCodeComponent implements OnInit {

  submitted = false;
  loading = false;
  costCenters = [];
  selectedCostCenter = ""
  selectCostCenterMapping : CostCenterAccountCodeMapping = {
    costCenter: '',
    accountCode: false
  }


  constructor(
    public dialogRef: MatDialogRef<MapCostCenterAccountCodeComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      overGroup: this.data.overGroup,
    });
  }


  ngOnInit() {
    this.selectCostCenterMapping = this.data.overGroup.costCenterAccountCodeMappingList[0]
    for(let i=0; i < this.data.overGroup.costCenterAccountCodeMappingList.length; i++){
      this.costCenters.push(this.data.overGroup.costCenterAccountCodeMappingList[i].costCenter);
    }
  }


  onChangeCostCenter(value){
    for(let i=0; i < this.data.overGroup.costCenterAccountCodeMappingList.length; i++){
      if(this.data.overGroup.costCenterAccountCodeMappingList[i].costCenter === value.value){
        this.selectCostCenterMapping = this.data.overGroup.costCenterAccountCodeMappingList[i]
      }
    }
  }


}
