
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/user";
import {Data} from "../../../models/data";
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { NgxSpinnerService } from 'ngx-spinner';
import { SchedulerConfigurationComponent } from '../../scheduler-configuration/scheduler-configuration.component';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from 'src/app/models/Account';



/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'syncJob-config',
  templateUrl: 'syncjobsconfiguration.component.html',
  styleUrls: ['syncJobsconfig.component.scss'],
})

export class SyncJobsconfigComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'username', 'lastName'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  syncJobTypes: SyncJobType[] = [];
  loading = true;
  account:Account;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private syncJobService: SyncJobService,  public dialog: MatDialog,
     public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private router: Router,
     private data: Data, private accountService: AccountService){
  }

  ngOnInit() {
    this.getSyncJobTypes();
    this.getAccount();
  }

  getAccount(){
    this.accountService.getAccount().toPromise().then((res: any) => {
      this.account = res;
      localStorage.setItem('accountERD',JSON.stringify(this.account.erd));

    }).catch(err => {''
      console.error(err);
    });

  }


  getSyncJobTypes(){
    this.loading = true
    this.spinner.show();

    this.syncJobService.getSyncJobTypesDB().toPromise().then((res: any) => {
      this.syncJobTypes = res;
      this.spinner.hide();
      this.loading = false


    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false
    });
  }

  openDialog(syncJobType){
    this.data.storage = syncJobType

    if (syncJobType.name == Constants.SUPPLIERS_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.SUPPLIERS_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.SUPPLIERS_CONFIG_PAGE]);
      }
    }
    else if (syncJobType.name == Constants.APPROVED_INVOICES_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.APPROVED_INVOICES_CONFIG_PAGE]);
      }
    }
    else if (syncJobType.name == Constants.CREDIT_NOTE_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.APPROVED_INVOICES_CONFIG_PAGE]);
      }
    }
    else if (syncJobType.name == Constants.JOURNALS_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.JOURNALS_SUN_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.JOURNALS_CONFIG_PAGE]);
      }
    }
    else if (syncJobType.name == Constants.BOOKED_TRANSFER_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.JOURNALS_SUN_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.JOURNALS_CONFIG_PAGE]);
      }
    }
    else if (syncJobType.name == Constants.POS_SALES_SYNC){
      if (this.account.erd == "SUN"){
        this.router.navigate([Constants.SUPPLIERS_CONFIG_PAGE]);
      }
      else{
        this.router.navigate([Constants.POS_SALES_CONFIG_PAGE]);
      }
    }
    else{
      this.snackBar.open("This sync job has not configuration yet.", null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }

  }

  openschedulerDialog(syncJobType){
    Constants.SYNC_TYPE_SCHEDULER = syncJobType.name
    const dialogRef = this.dialog.open(SchedulerConfigurationComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.duration) {
        this.spinner.show();
        syncJobType.configuration.duration = res.duration;
        syncJobType.configuration.day = res.day;
        syncJobType.configuration.dayName = res.dayName;
        syncJobType.configuration.hour = res.hour;

        this.syncJobService.updateSyncJobTypeConfig(syncJobType).then(result => {
              this.spinner.hide();

        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'right',
          });
        });
      }
    });
  }
  panelOpenState = true;
}
const EXPANSION_PANEL_ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)';
MatExpansionPanel['decorators'][0].args[0].animations = [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ])];
const ELEMENT_DATA: User[] = [

];
