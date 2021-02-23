import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Data } from 'src/app/models/data';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { AddAppGroupComponent } from '../add-app-group/add-app-group.component';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  company: Company = new Company();
  newGroup: Group = new Group();

  groupsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No Groups found</span>
    </div>
  `
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    groupsData: [] 
  };

  constructor( private loyaltyService: LoyaltyService, private router: Router, private data: Data,
    public dialog: MatDialog, public snackBar: MatSnackBar, private sidNav: SidenavResponsive) { }

  ngOnInit() {
    this.company = this.data.storage;
    if(this.company == null || this.company == undefined){
      this.router.navigate([Constants.LOYALTY]);
    }else{
      this.getGroups();
    }
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(...selected);
  }
  
  addGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
        width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.company = this.company.id;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, true).then(result => {
          this.getGroups();

          this.newGroup = new Group();
          this.groupsList.showLoading = false;

          this.snackBar.open("Add sub-group successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.newGroup = new Group();
          this.groupsList.showLoading = false;

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
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

  getGroups(){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups(this.company.id).toPromise().then((res: any) => {
      this.groupsList.groupsData = res;
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }

  deleteCompanies(){
    this.groupsList.showLoading = true;
    this.loyaltyService.deleteAppGroups(this.groupsList.selected).then((res: any) => {
      this.getGroups();
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }
}
