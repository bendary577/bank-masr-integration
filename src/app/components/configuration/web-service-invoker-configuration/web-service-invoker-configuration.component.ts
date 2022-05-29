import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AddWebServiceInvokerComponent } from '../../add-web-service-invoker/add-web-service-invoker.component';
import { User } from '../../../models/user'
import { UserService } from 'src/app/services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewInvokerComponent } from '../../view-invoker/view-invoker.component';
import { InvokerUser } from 'src/app/models/InvokerUser';
import { SideNaveComponent } from '../../side-nave/side-nave.component';

@Component({
  selector: 'app-web-service-invoker-configuration',
  templateUrl: './web-service-invoker-configuration.component.html',
  styleUrls: ['./web-service-invoker-configuration.component.scss']
})
export class WebServiceInvokerConfigurationComponent implements OnInit {
  loading = false;

  newInvoker : InvokerUser = new InvokerUser();  
  invokers = [];

  @Input() syncJobType: SyncJobType;

  constructor(private sidNav: SideNaveComponent, public snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
     public dialog: MatDialog, public userService: UserService) { }

  ngOnInit() {
    this.getInvokerUsers();
  }

  getInvokerUsers(){
    this.spinner.show()
    let typeId = ""
    if(this.syncJobType != null){
      typeId = this.syncJobType.id
    }
    this.userService.getInvokerUser(typeId).toPromise().then(result => {
      this.invokers = result as User[];
      this.spinner.hide();
    }).catch(err => {
      this.spinner.hide();
    });
  }

  openInvokerDialog(){
    const dialogRef = this.dialog.open(AddWebServiceInvokerComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newInvoker.username = res.username;
        this.newInvoker.password = res.password;

        this.userService.addInvokerUser(this.newInvoker).toPromise().then(result => {
          this.snackBar.open("Add web service invoker successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
          
          this.newInvoker = new InvokerUser();
          this.getInvokerUsers();
          this.loading = false;
        }).catch(err => {
          console.log(
            {
              err: err
            }
          )
          this.loading = false;

          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error){
            message = err.error;
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

  viewInvokerRolesDialog(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "Invoker User Roles",
        invoker: row
    };
    dialogConfig.width = '420px';
    dialogConfig.maxWidth = '420px';
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ViewInvokerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.updateInvokerUser(this.newInvoker).toPromise().then(result => {
          this.snackBar.open("Web service invoker updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
          
          this.getInvokerUsers();
          this.loading = false;
        }).catch(err => {
          this.loading = false;

          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error){
            message = err.error;
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
