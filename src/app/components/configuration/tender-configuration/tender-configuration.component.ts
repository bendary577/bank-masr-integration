import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { Tender } from 'src/app/models/Tender';
import { PosSalesService } from 'src/app/services/posSales/pos-sales.service';
import { AddTenderComponent } from '../../add-tender/add-tender.component';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';

@Component({
  selector: 'app-tender-configuration',
  templateUrl: './tender-configuration.component.html',
  styleUrls: ['./tender-configuration.component.scss']
})
export class TenderConfigurationComponent implements OnInit {
  loading = false;

  newTender : Tender = new Tender();  
  @Input() tenders: Tender[];

  @Input() syncJobType: SyncJobType;

  constructor(private salesService:PosSalesService,
     private sidNav: SidenavResponsive,
     public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openTenderDialog(){
    const dialogRef = this.dialog.open(AddTenderComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.newTender.checked = false;
        this.newTender.tender = res.name;
        this.newTender.account = res.account;
        this.newTender.analysisCodeT5 = res.analysisCodeT5;
        this.newTender.communicationRate = res.communicationRate;

        this.tenders.push(this.newTender);

        this.salesService.addTender(this.tenders, this.syncJobType.id).toPromise().then(result => {
          this.loading = false;

          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.tenders.pop();

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
