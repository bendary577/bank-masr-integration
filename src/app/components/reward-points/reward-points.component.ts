import { Component, OnInit } from '@angular/core';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-reward-points',
  templateUrl: './reward-points.component.html',
  styleUrls: ['./reward-points.component.scss']
})
export class RewardPointsComponent implements OnInit {

  constructor(private sideNav : SideNaveComponent) {   }

  ngOnInit() {
  }

  hasRole(role): Boolean{
   return this.sideNav.hasRole(role);
  }
}
