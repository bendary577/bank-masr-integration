import { Component, Input, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-analysis-configuration',
  templateUrl: './analysis-configuration.component.html',
  styleUrls: ['./analysis-configuration.component.scss']
})
export class AnalysisConfigurationComponent implements OnInit {
  @Input() analysis;

  constructor() { }

  ngOnInit() {
  }

}
