import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class LoyaltyComponent implements OnInit {

  constructor(private _location: Location, private sideNav : SideNaveComponent) {   }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  hasRole(role): Boolean{
    console.log(this.sideNav.hasRole(role))
   return this.sideNav.hasRole(role);
  }

}
