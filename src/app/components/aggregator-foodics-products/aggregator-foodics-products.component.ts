import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { ViewProductModifiersComponent } from '../view-product-modifiers/view-product-modifiers.component';
import { FoodicsProductDetailsComponent } from '../foodics-product-details/foodics-product-details.component';
import { AggregatorIntegrationErrorComponent } from '../aggregator-integration-error/aggregator-integration-error.component';

@Component({
  selector: 'app-aggregator-foodics-products',
  templateUrl: './aggregator-foodics-products.component.html',
  styleUrls: ['./aggregator-foodics-products.component.scss']
})
export class AggregatorFoodicsProductsComponent implements OnInit {

  productsMappingData = [];
  links = [];
  nextLink = "";
  prevLink = "";
  firstLink = "";
  lastLink = "";
  total = 0;
  perPage = 0;
  curPage = 0;
  requestAPI = "https://api-sandbox.foodics.com/v5/products?page=1";

  showLoading: boolean;
  message: 'No data yet';

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private authService: AuthService
    , private foodicsService: FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getFoodicsProducts();
  }

  getFoodicsProducts() {
    // let foodics_token_generated = localStorage.getItem('foodics_token_generated');
    // if(foodics_token_generated === 'true'){
      this.showLoading=true
      this.spinner.show();
        this.foodicsService
        .getFoodicsProductsPaginated(this.requestAPI)
        .toPromise()
        .then((res) => {
          this.productsMappingData = res['data']['data'];
          this.nextLink = res['data']['links']['next'];
          this.prevLink = res['data']['links']['prev'];
          this.lastLink = res['data']['links']['last'];
          this.firstLink = res['data']['links']['first'];
          this.total = res['data']['meta']['total'];
          this.perPage = res['data']['meta']['per_page'];
          this.curPage = res['data']['meta']['current_page'];
          console.log(this.prevLink)
          this.mapPagination(this.nextLink, this.prevLink, this.lastLink, this.firstLink)
          this.showLoading=false
          this.spinner.hide();
      }).catch(err => {
        // let message = "";
        // if (err.error){
        //   message = err.error;
        // } else if (err.message){
        //   message = err.message;
        // } else {
        //   message = ErrorMessages.FAILED_TO_GET_CONFIG;
        // }
        // this.snackBar.open(message , null, {
        //   duration: 3000,
        //   horizontalPosition: 'center',
        //   panelClass:"my-snack-bar-fail"
        // });
        // this.showLoading=false
        // this.spinner.hide();
        const dialogConfig = new MatDialogConfig()
        dialogConfig.width = '600px'
        dialogConfig.maxWidth = '600px'
        dialogConfig.autoFocus = true
    
        let dialogRef = this.dialog.open(AggregatorIntegrationErrorComponent, dialogConfig)
    
        dialogRef.afterClosed().subscribe((res) => {})
      });
  }

  mapPagination(next, prev, last, first){
    if(this.links.length === 0){
      if(first !== null){
        this.links.push("first")
      }
      if(next !== null){
        this.links.push("next")
      }
      if(prev !== null){
        this.links.push("previous")
      }
      if(last !== null){
        this.links.push("last")
      }
    }
    if(this.links["previous"] === null && this.links.length !== 0){
      this.links.push("previous")
    }
  }

  onLimitChange(value) {
    if(value==="next"){
      this.requestAPI = this.nextLink
    }else if(value==="previous"){
      this.requestAPI = this.prevLink
    }else if(value==="first"){
      this.requestAPI = this.firstLink
    }else if(value==="last"){
      this.requestAPI = this.lastLink
    }
    this.getFoodicsProducts()
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
