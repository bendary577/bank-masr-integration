import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { AddAppCompanyComponent } from '../add-app-company/add-app-company.component';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { Company } from '../../models/loyalty/Company'
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-manage-comanies',
  templateUrl: './manage-comanies.component.html',
  styleUrls: ['./manage-comanies.component.scss']
})
export class ManageComaniesComponent implements OnInit {
  loading = false;
  companies = [];
  newCompany: Company = new Company();

  companiesList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no groups yet.</span>
    </div>
  `
    },
    selected: [],
    companiesCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    companiesData: [] 
  };

  constructor(public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, public dialog: MatDialog,
    private loyaltyService: LoyaltyService, private router: Router, private data: Data) { }

  ngOnInit() {
    this.getCompanies();
  }

  onSelect({selected}) {
    this.companiesList.selected.splice(0, this.companiesList.selected.length);
    this.companiesList.selected.push(...selected);
  }

  openCompany(company: Company){
    this.data.storage = company;
    this.router.navigate([Constants.MANAGE_GROUPS]);
  }

  getCompanies(){
    this.companiesList.showLoading = true;
    this.loyaltyService.getAppCompanies().toPromise().then((res: any) => {
      this.companiesList.companiesData = res;
      this.companiesList.showLoading = false;
    }).catch(err => {
      this.companiesList.showLoading = false;
    });
  }

  deleteCompanies(){
    this.companiesList.showLoading = true;
    this.loyaltyService.deleteAppCompanies(this.companiesList.selected).then((res: any) => {
      this.getCompanies();
      this.companiesList.showLoading = false;
    }).catch(err => {
      this.companiesList.showLoading = false;
    });
  }

  addCompanyDialog(){
    const dialogRef = this.dialog.open(AddAppCompanyComponent, {
        width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;

        this.newCompany.name = res.name;
        this.newCompany.description = res.description;
        this.newCompany.discountRate = res.discountRate;
        this.newCompany.deleted = false;

        this.companiesList.showLoading = true;
        this.loyaltyService.addAppCompanies(this.newCompany, true).then(result => {
          this.loading = false;
          this.companiesList.showLoading = false;
          this.getCompanies();

          this.newCompany = new Company();

          this.snackBar.open("Add comapny successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.companiesList.showLoading = false;

          this.newCompany = new Company();

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
    const dialogRef = this.dialog.open(AddAppCompanyComponent, {
      width: '550px',
      data: {comapny: this.companiesList.selected[0]}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newCompany = this.companiesList.selected[0];

        this.newCompany.name = res.name;
        this.newCompany.description = res.description;
        this.newCompany.discountRate = res.discountRate;
        this.newCompany.deleted = false;

        this.companiesList.showLoading = true;
        this.loyaltyService.addAppCompanies(this.newCompany, false).then(result => {
          this.loading = false;
          this.companiesList.showLoading = false;
          this.getCompanies();

          this.newCompany = new Company();

          this.snackBar.open("Comapny updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.companiesList.showLoading = false;

          this.newCompany = new Company();

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
