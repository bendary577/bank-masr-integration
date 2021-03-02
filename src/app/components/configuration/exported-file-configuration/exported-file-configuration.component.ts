import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exported-file-configuration',
  templateUrl: './exported-file-configuration.component.html',
  styleUrls: ['./exported-file-configuration.component.scss']
})
export class ExportedFileConfigurationComponent implements OnInit {
  @Input() syncJobType;

  constructor() { }

  ngOnInit() {
  }

}
