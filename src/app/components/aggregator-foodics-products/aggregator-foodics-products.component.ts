import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { ViewProductModifiersComponent } from '../view-product-modifiers/view-product-modifiers.component';
import { FoodicsProductDetailsComponent } from '../foodics-product-details/foodics-product-details.component';
import { AggregatorIntegrationErrorComponent } from '../aggregator-integration-error/aggregator-integration-error.component';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-aggregator-foodics-products',
  templateUrl: './aggregator-foodics-products.component.html',
  styleUrls: ['./aggregator-foodics-products.component.scss']
})
export class AggregatorFoodicsProductsComponent implements OnInit {

  productsMappingData = [];
  total = 0;
  perPage = 0;
  curPage = 0;
  requestAPI = "https://api-sandbox.foodics.com/v5/products?page=";
  generalSettings: GeneralSettings = new GeneralSettings();
  showLoading: boolean;
  message: 'No data yet';
  integrationComplete = false;
  from : 0;
  to : 0;


  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private authService: AuthService, private generalSettingsService: GeneralSettingsService, private foodicsService: FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.from = 0
    this.to = 0
    this.requestAPI = "https://api-sandbox.foodics.com/v5/products?page="+1;
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      if(this.generalSettings.talabatConfiguration.integrationStatus){
          this.integrationComplete=true;
          this.getFoodicsProducts();
      }else{
          const dialogConfig = new MatDialogConfig()
          dialogConfig.width = '600px'
          dialogConfig.maxWidth = '600px'
          dialogConfig.autoFocus = true
          let dialogRef = this.dialog.open(AggregatorIntegrationErrorComponent, dialogConfig)
          dialogRef.afterClosed().subscribe((res) => {})
          this.showLoading=false
          this.spinner.hide();
      }
      this.spinner.hide();
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG;
      }
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
    });
  }

  getFoodicsProducts() {
      this.showLoading=true
      this.spinner.show();
        this.foodicsService
        .getFoodicsProductsPaginated(this.requestAPI)
        .toPromise()
        .then((res) => {
          this.productsMappingData = res['data']['data'];
          this.total = res['data']['meta']['total'];
          this.from = res['data']['meta']['from'];
          this.to = res['data']['meta']['to'];
          this.perPage = res['data']['meta']['per_page'];
          this.curPage = res['data']['meta']['current_page'];
          this.showLoading=false
          this.spinner.hide();
      }).catch(err => {
        let message = "";
        if (err.error){
          message = err.error.message;
        } else if (err.message){
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_GET_CONFIG;
        }
        this.snackBar.open(message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.showLoading=false
        this.spinner.hide();
      });
  }

  changePage(pageNumber){
    this.requestAPI = "https://api-sandbox.foodics.com/v5/products?page="+pageNumber.page;
    this.getFoodicsProducts();
  }

  viewModifiersDialog(product){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {product: product, foodicsProductDetails : true};
    dialogConfig.minWidth = 500;
    dialogConfig.maxHeight = 500;

    const dialogRef = this.dialog.open(ViewProductModifiersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onSaveClick();
      }
    });
  }

  viewProductDetails(product){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {product: product};
    dialogConfig.minWidth = 500;
    dialogConfig.maxHeight = 500;

    const dialogRef = this.dialog.open(FoodicsProductDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onSaveClick();
      }
    });
  }




  onSaveClick(){
    // this.spinner.show();

    // try {

    //   this.generalSettingsService
    //   .updateGeneralSettings(this.generalSettings)
    //   .then(result => {
    //     const response = result as Response;
    //     if (response.success) {
    //       this.snackBar.open('Integration data saved successfully.', null, {
    //         duration: 2000,
    //         horizontalPosition: 'center',
    //         panelClass:"my-snack-bar-success"
    //       });
    //     }else{
    //       this.snackBar.open('An error has occurred.', null, {
    //         duration: 2000,
    //         horizontalPosition: 'center',
    //         panelClass:"my-snack-bar-fail"
    //       });
    //     }
    //     this.spinner.hide();
    //   }
    //   ).catch(err => {
    //     this.snackBar.open('An error has occurred.', null, {
    //       duration: 2000,
    //       horizontalPosition: 'center',
    //       panelClass:"my-snack-bar-fail"
    //     });
    //     this.spinner.hide();
    //   });
    // } catch (e) {
    //   this.snackBar.open('Failed to save simphony discount rates, Please try again.', null, {
    //     duration: 2000,
    //     horizontalPosition: 'center',
    //     panelClass:"my-snack-bar-fail"
    //   });

    //   this.spinner.hide();
    // }
  }

}
