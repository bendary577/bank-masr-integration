import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SideNaveComponent } from '../side-nave/side-nave.component';


@Directive({selector: 'child-directive'})
class ChildDirective {
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public iconOnlyToggled = false;
  public sidebarToggled = false;
  public user;
  public roles;
  public account;
  @ViewChild(ChildDirective) searchInput!: ChildDirective;

  constructor(private config: NgbDropdownConfig,private router: Router, private sideNav : SideNaveComponent) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    if(localStorage.getItem("user") != undefined || localStorage.getItem("user") != null){
      this.user = JSON.parse(localStorage.getItem("user"))
      this.roles = JSON.parse(localStorage.getItem("roles"));
      this.account = JSON.parse(localStorage.getItem("account"));
     }
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  
  searchChange(event) {
    this.sideNav.searchModules(event.target.value)
  }

  // toggle sidebar
  toggleSidebar() {
    console.log("A")
    let body = document.querySelector('body');
    console.log("B")

    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      console.log("C")

      this.iconOnlyToggled = !this.iconOnlyToggled;
      console.log("DD")

      if(this.iconOnlyToggled) {
        console.log("E")

        body.classList.add('sidebar-icon-only');
        console.log("F")

        localStorage.setItem("side-menu-width", "all");
        console.log("G")

      } else {
        console.log("H")

        body.classList.remove('sidebar-icon-only');
        console.log("I")

        localStorage.setItem("side-menu-width", "small");
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;    console.log("A")

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
    this.sideNav.Logout();
  }


}
