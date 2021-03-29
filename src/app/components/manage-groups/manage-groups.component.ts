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
  loading = false;
  newGroup: Group = new Group();

  groupsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no groups yet.</span>
    </div>
  `
    },
    selected: [],
    groupsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    groupsData: [] 
  };

  constructor(public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, public dialog: MatDialog,
    private loyaltyService: LoyaltyService, private router: Router, private data: Data) { }

  ngOnInit() {
    this.getGroups();
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(selected);
  }

  openCompany(company: Company){
    this.data.storage = company;
    this.router.navigate([Constants.MANAGE_GROUPS]);
  }

  getGroups(){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups().toPromise().then((res: any) => {
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

  addCompanyDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
        width: '550px',
        data: {
          companies: this.groupsList.groupsData
        }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;

        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.parentGroupId = res.company.id;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, true).then(result => {
          this.loading = false;
          this.groupsList.showLoading = false;
          this.getGroups();
          this.newGroup = new Company();

          this.snackBar.open("Add comapny successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.groupsList.showLoading = false;

          this.newGroup = new Company();

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

  updateCompanyDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
      width: '550px',
      data: {comapny: this.groupsList.selected[0],
        companies: this.groupsList.groupsData
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newGroup = this.groupsList.selected[0];

        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, false).then(result => {
          this.loading = false;
          this.groupsList.showLoading = false;
          this.getGroups();

          this.newGroup = new Company();

          this.snackBar.open("Comapny updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.groupsList.showLoading = false;

          this.newGroup = new Company();

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
}
