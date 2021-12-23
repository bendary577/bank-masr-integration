import { Component, Input, OnInit } from '@angular/core';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-tax-analysis-configrution',
  templateUrl: './tax-analysis-configrution.component.html',
  styleUrls: ['./tax-analysis-configrution.component.scss']
})
export class TaxAnalysisConfigrutionComponent implements OnInit {
  @Input() syncJobType: SyncJobType;

  constructor() { }

  ngOnInit(): void {
  }

}
