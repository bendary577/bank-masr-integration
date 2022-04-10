import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'oracle-hospitality-frontend';
    
  shouldRun: boolean=false;

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  showSettings: boolean = true;
  isLoading: boolean;
  
  constructor(private router : Router){
    router.events.subscribe((val) => {
      // see also
      if(val instanceof NavigationEnd) {
      if (val.url == "/" || val.url == "/login" || val.url == "/forgetPassword")
      this.shouldRun = false;
      else
      this.shouldRun = true;
      }
    });
  }
  
}
