import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public iconOnlyToggled = false;
  public sidebarToggled = false;
  public logedUSer;
  public roles;
  
  constructor(config: NgbDropdownConfig, private sideNave : SidenavResponsive, router: Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {

    if(localStorage.getItem("user") != undefined && localStorage.getItem("user") != null){
      this.logedUSer =  localStorage.getItem("user");
      this.roles = localStorage.getItem("roles");
    }
        
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
        localStorage.setItem("side-menu-width", "all");
      } else {
        body.classList.remove('sidebar-icon-only');
        localStorage.setItem("side-menu-width", "small");
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }

  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }

  Logout(){
    this.sideNave.Logout()
  }
}
