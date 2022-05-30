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
import { TalabatService } from 'src/app/services/talabat/talabat.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { ViewProductModifiersComponent } from '../view-product-modifiers/view-product-modifiers.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FoodicsProduct } from 'src/app/models/deliveryAggregator/foodics-product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AggregatorIntegrationErrorComponent } from '../aggregator-integration-error/aggregator-integration-error.component';

@Component({
  selector: 'app-talabat-unmapped-products',
  templateUrl: './talabat-unmapped-products.component.html',
  styleUrls: ['./talabat-unmapped-products.component.scss']
})
export class TalabatUnmappedProductsComponent implements OnInit {

  newProductMapping = new ProductMapping();
  newModifierMapping = new ModifierMapping();
  newDiscountMapping = new DiscountMapping();
  newCustomerMapping = new CustomerMapping();
  newAddressMapping = new AddressMapping();

  productsMappingData = [];
  mappedProductsMappingData = [];
  modifierOptionsMappingData = []

  showLoading: boolean;
  message: 'No data yet';

  generalSettings: GeneralSettings = new GeneralSettings();

  foodicsProducts  : FoodicsProduct[] = [];
  foodicsProductsNames = [];
  myControl = new FormControl();
  formControls : FormControl[] = []
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  tableForm = new FormGroup({});

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService
    , private talabatService: TalabatService,private foodicsService: FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getGeneralSettings();
    // this.getProductsMapping();
    // this.getMappedProductsMapping();
    // this.getFoodicsProducts();
  }

  fillFormControls(){
    console.log("in form control")
    if(this.productsMappingData.length > 0){
      for(let i=0; i < this.productsMappingData.length; i++){
        let controlName = this.getRowFormControlName(this.productsMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        console.log(controlName)
        this.tableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.foodicsProductsNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  getGeneralSettings() {
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      // this.productsMappingData = this.generalSettings.talabatConfiguration.productsMappings;
      this.modifierOptionsMappingData = this.generalSettings.talabatConfiguration.modifierMappings;

      if(this.modifierOptionsMappingData == undefined){
        this.modifierOptionsMappingData = [];
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

  getProductsMapping() {
    this.spinner.show();
      this.foodicsService
      .getUnMappedProducts()
      .toPromise()
      .then((res) => {
        this.productsMappingData = res['data'];
        this.fillFormControls()
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

  getMappedProductsMapping() {
    this.spinner.show();
      this.foodicsService
      .getMappedProducts()
      .toPromise()
      .then((res) => {
        this.mappedProductsMappingData = res['data'];
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
    this.spinner.show();
      this.foodicsService
      .getFoodicsProducts(1,2)
      .toPromise()
      .then((res) => {
        this.foodicsProducts = res['data']['data'];
        this.init();
        this.mapFoodicsProductsNames(this.foodicsProducts)
        this.spinner.hide();
    }).catch(err => {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '600px'
      dialogConfig.maxWidth = '600px'
      dialogConfig.autoFocus = true
  
      let dialogRef = this.dialog.open(AggregatorIntegrationErrorComponent, dialogConfig)
  
      dialogRef.afterClosed().subscribe((res) => {})
      this.spinner.hide();
    });
  }

  getRowFormControlName(productMapping){
    //remove spaces from product mapping name
    let formControlName = productMapping.name
    return formControlName.replace(/[^A-Z]+/ig, "")
  }

  private returnFoodicsProductNameById(foodicsId){
    for(let i=0; i < this.foodicsProducts.length; i++){
      if(this.foodicsProducts[i].id === foodicsId){
        return this.foodicsProducts[i].name
      }
    }
  }

  mapFoodicsProductsNames(products){
    for(let i=0; i < products.length; i++){
      this.foodicsProductsNames.push(products[i].name);
    }
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      console.log("####### ")
      const abstractControl = this.tableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }

  mapInputModel(productMapping){
    return this.returnFoodicsProductNameById(productMapping.foodIcsProductId);
  }

  onChangeInputEvent(event: any, formControlName){
    console.log("change input " + formControlName + " " + event)
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      if(formControlName === key){
        const abstractControl = this.tableForm.controls[key];
        if(event !== "" && event !== '' && event !== undefined && event != null){
          this.filteredOptions = abstractControl.valueChanges.pipe(
            startWith(event),
            map(value => this._filter(value)),
          );
        }
      }
    });
  }

  init(){
    this.getGeneralSettings();
    this.getProductsMapping();
    this.getMappedProductsMapping();
    this.fetchProducts();
  }

  fetchProducts(){
    this.spinner.show();
    this.talabatService.getTalabatMenuItems().toPromise().then((res) => {
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

  addProductsMappingData(){
    if(this.newProductMapping.name &&  this.newProductMapping.foodIcsProductId && this.newProductMapping.talabatProductId){
      this.productsMappingData.push(this.newProductMapping);
      this.newProductMapping = new ProductMapping();

      this.productsMappingData = [...this.productsMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  viewModifiersDialog(product){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {product: product, foodicsProductDetails : false};
    dialogConfig.minWidth = 500;
    dialogConfig.maxHeight = 500;
    
    const dialogRef = this.dialog.open(ViewProductModifiersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onSaveClick();
      }
    });
  }

  addModifierMappingData(){
    if(this.newModifierMapping.name &&  this.newModifierMapping.foodicsProductId ){

      this.modifierOptionsMappingData.push(this.newModifierMapping);
      // let modifier = new ModifierMapping();
      // modifier.name = this.newModifierMapping.name
      // modifier.foodicsProductId = this.newModifierMapping.foodicsProductId
      // modifier.secondFoodicsProductId = this.newModifierMapping.secondFoodicsProductId
      // modifier.talabatProductId = this.newModifierMapping.talabatProductId
      // this.modifierOptionsMappingData.push(modifier);
      this.newModifierMapping = new ModifierMapping();
      this.modifierOptionsMappingData = [...this.modifierOptionsMappingData];

    }else {
      this.snackBar.open('Please fill all modifier fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }


  onSaveClick(){
    this.spinner.show();

    try {
      let allProductsMapping = this.productsMappingData.concat(this.mappedProductsMappingData);
      this.generalSettings.talabatConfiguration.productsMappings = allProductsMapping;
      this.generalSettings.talabatConfiguration.modifierMappings = this.modifierOptionsMappingData;

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        this.authService.generalSettings = this.generalSettings;
        if (response.success) {
          this.snackBar.open('Integration data saved successfully.', null, {
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
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.spinner.hide();
      });
    } catch (e) {
      this.snackBar.open('Failed to save simphony discount rates, Please try again.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
    }
  }

  changeFoodicsProductMapping(value, productMapping) {
    let chosenFoodicsProduct : FoodicsProduct[] = [];
    chosenFoodicsProduct = this.foodicsProducts.filter(function(foodicsProduct) {
      return foodicsProduct.name === value;
    });
    if(chosenFoodicsProduct != null && chosenFoodicsProduct.length > 0){
      productMapping.foodIcsProductId = chosenFoodicsProduct[0].id
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

}
