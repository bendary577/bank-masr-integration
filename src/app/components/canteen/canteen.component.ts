import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { SideNaveComponent } from '../side-nave/side-nave.component'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss'],
})
export class CanteenComponent implements OnInit {
  groups = [] 

  constructor(
    private _location: Location,
    private sideNav: SideNaveComponent,
    private loyaltyService: LoyaltyService
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  backClicked() {
    this._location.back()
  }

  hasRole(role): Boolean {
    return this.sideNav.hasRole(role)
  }

  getGroups() {
    this.loyaltyService
      .getAppGroups(true, "", 2)
      .toPromise()
      .then((res: any) => {
        this.groups = res
      })
      .catch((err) => {
      })
  }

}
