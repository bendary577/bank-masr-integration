import { Component, Input, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-ohra-configuration',
  templateUrl: './ohra-configuration.component.html',
  styleUrls: ['./ohra-configuration.component.scss']
})
export class OhraConfigurationComponent implements OnInit {
  userDefinedFlag = false;

  @Input() syncJobType: SyncJobType;
  
  constructor() { }

  ngOnInit() {
    if(this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }
  }

  chooseTimePeriod(){
    if(this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }else{
      this.userDefinedFlag = false;
    }
  }

}
