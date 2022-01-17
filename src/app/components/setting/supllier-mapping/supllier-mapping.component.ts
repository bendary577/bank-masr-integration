import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
import { Supplier } from 'src/app/models/supplier';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { AddSupplierComponent } from '../../add-supplier/add-supplier.component';
import { SupplierService } from '../../../services/supplier/supplier.service'
import { SideNaveComponent } from '../../side-nave/side-nave.component';

@Component({
  selector: 'app-supllier-mapping',
  templateUrl: './supllier-mapping.component.html',
  styleUrls: ['./supllier-mapping.component.scss']
})
export class SupplierMappingComponent implements OnInit {
  suppliers: Supplier[];
  newSupplier: Supplier = new Supplier();
  loading = false;
  suppliersLoding = true;
  saveLoading = false;
  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,  public dialog: MatDialog,
    private generalSettingsService:GeneralSettingsService, private sidNav: SideNaveComponent,
    private supplierService: SupplierService) {
  }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.suppliers = this.generalSettings.suppliers;
      
      this.spinner.hide();
      this.suppliersLoding = false;
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = "Failed to get general settings.";
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      
      this.spinner.hide();
      this.suppliersLoding = false;
    });
  }

  openSupplierDialog(){
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;

        this.newSupplier = new Supplier();
        this.newSupplier.supplierName = res.supplierName;
        this.newSupplier.accountCode = res.accountCode;

        if(!this.generalSettings.suppliers){
          this.generalSettings.suppliers = [];
        }
        this.generalSettings.suppliers.push(this.newSupplier);

        this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
          this.newSupplier = new Supplier();  
          this.loading = false;

          this.snackBar.open("Add supplier successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

          this.spinner.hide();
          this.loading = false;
          
        }).catch(err => {
          this.spinner.hide();
          this.loading = false;

          this.newSupplier = new Supplier();
          this.suppliers.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add supplier now, please try again.';
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

  getSuppliers(){
    this.spinner.show();
    this.supplierService.fetchSuppliers().toPromise().then((res: any) => {
      this.suppliers = res;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;

    if(this.suppliers.length != 0) {
      this.generalSettings.suppliers = this.suppliers;

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        if (response.success) {
          this.snackBar.open('Save configuration successfully.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
        }else{
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        }
        this.spinner.hide();
        this.saveLoading = false;
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.spinner.hide();
        this.saveLoading = false;
      });
    }else{
      this.spinner.hide();
    }
  }
}
