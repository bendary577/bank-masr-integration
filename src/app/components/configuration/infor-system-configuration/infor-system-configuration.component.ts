import { Component, Input, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-infor-system-configuration',
  templateUrl: './infor-system-configuration.component.html',
  styleUrls: ['./infor-system-configuration.component.scss']
})
export class InforSystemConfigurationComponent implements OnInit {
  @Input() syncJobType: SyncJobType;

  constructor() { }

  ngOnInit() {
    console.log({
      syncJobType: this.syncJobType
    })
  }

}
