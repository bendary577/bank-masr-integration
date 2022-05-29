import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
import { AddressMapping } from 'src/app/models/deliveryAggregator/address-mapping';
import { CustomerMapping } from 'src/app/models/deliveryAggregator/customer-mapping';
import { DiscountMapping } from 'src/app/models/deliveryAggregator/discount-mapping';
import { ProductMapping } from 'src/app/models/deliveryAggregator/product-mapping';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { ModifierMapping } from 'src/app/models/deliveryAggregator/ModifierMapping';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { ViewProductModifiersComponent } from '../view-product-modifiers/view-product-modifiers.component';
import { FoodicsProductDetailsComponent } from '../foodics-product-details/foodics-product-details.component';

@Component({
  selector: 'app-aggregator-foodics-products',
  templateUrl: './aggregator-foodics-products.component.html',
  styleUrls: ['./aggregator-foodics-products.component.scss']
})
export class AggregatorFoodicsProductsComponent implements OnInit {

  productsMappingData = [];
  showLoading: boolean;
  message: 'No data yet';

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private authService: AuthService
    , private foodicsService: FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getFoodicsProducts();
  }

  getFoodicsProducts() {
    let foodics_token_generated = localStorage.getItem('foodics_token_generated');
    if(foodics_token_generated === 'true'){
      this.showLoading=true
      this.spinner.show();
        this.foodicsService
        .getFoodicsProducts(1,2)
        .toPromise()
        .then((res) => {
          this.productsMappingData = res['data'];
          localStorage.setItem('foodics_products_returned', 'true');
          this.showLoading=false
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
        this.showLoading=false
        this.spinner.hide();
      });
    }else{
      this.snackBar.open('Please finish foodics account integration step before start getting products' , null, {
        duration: 5000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.showLoading=false
      this.spinner.hide();
    }
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
