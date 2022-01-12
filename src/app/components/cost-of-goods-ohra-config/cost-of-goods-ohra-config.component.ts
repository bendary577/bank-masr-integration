import { Component, Input, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-cost-of-goods-ohra-config',
  templateUrl: './cost-of-goods-ohra-config.component.html',
  styleUrls: ['./cost-of-goods-ohra-config.component.scss']
})
export class CostOfGoodsOhraConfigComponent implements OnInit {

  userDefinedFlag = false;

  @Input() syncJobType: SyncJobType;
  constructor() { }

  ngOnInit() {
    if (this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }
  }

  chooseTimePeriod(){
    if(this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }else {
      this.userDefinedFlag = false;
    }
  }
}
