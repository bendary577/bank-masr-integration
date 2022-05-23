import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { SideNaveComponent } from '../side-nave/side-nave.component'

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss'],
})
export class CanteenComponent implements OnInit {
  constructor(
    private _location: Location,
    private sideNav: SideNaveComponent,
  ) {}

  ngOnInit() {
  }

  backClicked() {
    this._location.back()
  }

  hasRole(role): Boolean {
    return this.sideNav.hasRole(role)
  }
}
