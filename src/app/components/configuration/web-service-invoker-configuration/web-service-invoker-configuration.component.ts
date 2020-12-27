import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AddWebServiceInvokerComponent } from '../../add-web-service-invoker/add-web-service-invoker.component';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';
import { User } from '../../../models/user'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-web-service-invoker-configuration',
  templateUrl: './web-service-invoker-configuration.component.html',
  styleUrls: ['./web-service-invoker-configuration.component.scss']
})
export class WebServiceInvokerConfigurationComponent implements OnInit {
  loading = false;

  newInvoker : User = new User();  
  invokers = [];

  @Input() syncJobType: SyncJobType;

  constructor(private sidNav: SidenavResponsive, public snackBar: MatSnackBar,
     public dialog: MatDialog, public userService: UserService) { }

  ngOnInit() {
  }

  openInvokerDialog(){
    const dialogRef = this.dialog.open(AddWebServiceInvokerComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newInvoker.username = res.username;
        this.newInvoker.password = res.password;

        this.userService.addInvokerUser(this.newInvoker, this.syncJobType.id).toPromise().then(result => {
          this.loading = false;

          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;

          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = ErrorMessages.FAILED_TO_SYNC;
          }
    
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

}
