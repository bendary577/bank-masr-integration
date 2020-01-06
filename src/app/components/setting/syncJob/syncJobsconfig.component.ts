
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatExpansionPanel, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/user";
import {Data} from "../../../models/data";
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuppliersConfiguartionComponent } from '../../suppliers-configuartion/suppliers-configuartion.component';
import { SchedulerConfigurationComponent } from '../../scheduler-configuration/scheduler-configuration.component';
import { ApprovedInvoiceConfigurationComponent } from '../../approved-invoice-configuration/approved-invoice-configuration.component';
import { Router, NavigationExtras } from '@angular/router';
import { Constants } from 'src/app/models/constants';



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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private syncJobService: SyncJobService,  public dialog: MatDialog,
     public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private router: Router,
     private data: Data ){
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.getSyncJobTypes();
  }


  getSyncJobTypes(){
    this.spinner.show();

    this.syncJobService.getSyncJobTypesDB().toPromise().then((res: any) => {
      this.syncJobTypes = res;
      this.spinner.hide();

    }).catch(err => {
      console.error(err);
      this.spinner.hide();

    });
  }

  openDialog(syncJobType){
    if (syncJobType.name == "Get Suppliers"){
      this.data.storage = syncJobType
      this.router.navigate([Constants.SUPPLIERS_CONFIG_PAGE]);
    }
    else if (syncJobType.name == "Get Approved Invoices"){
      this.router.navigate([Constants.APPROVED_INVOICES_CONFIG_PAGE]);
    }
    else if (syncJobType.name == "Get Booked Transfers"){
      this.router.navigate([Constants.BOOKED_TRANSFER_CONFIG_PAGE]);
    }
    else if (syncJobType.name == "Get Booked Waste"){
      this.router.navigate([Constants.BOOKED_WASTE_CONFIG_PAGE]);
    }
    else if (syncJobType.name == "Get Credit Note"){
      this.router.navigate([Constants.CREDIT_NOTE_CONFIG_PAGE]);
    }
    else{
      // add snack bar
    }

  }
    
  openschedulerDialog(syncJobType){
    const dialogRef = this.dialog.open(SchedulerConfigurationComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.duration) {
        this.spinner.show();
        syncJobType.duration = res.duration;

        this.syncJobService.updateSyncJobTypeConfig(syncJobType).then(result => {
              console.log(result);
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
  {id:0,password:"",firstName:"asdasdasdas", username: 'Hydrogen', lastName:'asdasdas',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},

];
