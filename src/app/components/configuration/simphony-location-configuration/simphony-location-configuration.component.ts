import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SimphonyLocation } from 'src/app/models/SimphonyLocation';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { AddSimphonyLocationComponent } from '../../add-simphony-location/add-simphony-location.component';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';

@Component({
  selector: 'app-simphony-location-configuration',
  templateUrl: './simphony-location-configuration.component.html',
  styleUrls: ['./simphony-location-configuration.component.scss']
})
export class SimphonyLocationConfigurationComponent implements OnInit {

  loading = false;

  newLocation : SimphonyLocation = new SimphonyLocation();  
  @Input() locations: SimphonyLocation[];

  @Input() syncJobType: SyncJobType;

  constructor(private sidNav: SidenavResponsive, public snackBar: MatSnackBar, public dialog: MatDialog,
    public simphonyService: MenuItemsService) { }

  ngOnInit() {
  }

  openSimphonyLocationDialog(){
    const dialogRef = this.dialog.open(AddSimphonyLocationComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.newLocation.checked = false;
        this.newLocation.employeeNumber = res.employeeNumber;
        this.newLocation.revenueCenterID = res.revenueCenterID;
        this.newLocation.revenueCenterName = res.revenueCenterName;
        this.newLocation.simphonyServer = res.simphonyServer;

        this.locations.push(this.newLocation);

        this.simphonyService.addSimphonyLocation(this.locations).toPromise().then(result => {
          this.loading = false;

          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.locations.pop();

          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
          }
    
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

}
