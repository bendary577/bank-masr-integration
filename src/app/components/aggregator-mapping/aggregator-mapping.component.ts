import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-aggregator-mapping',
  templateUrl: './aggregator-mapping.component.html',
  styleUrls: ['./aggregator-mapping.component.scss']
})
export class AggregatorMappingComponent implements OnInit {

  constructor(private _location: Location, private sideNav : SideNaveComponent) {   }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  hasRole(role): Boolean{
   return this.sideNav.hasRole(role);
  }

}
