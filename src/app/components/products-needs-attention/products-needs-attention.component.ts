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
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FoodicsProduct } from 'src/app/models/deliveryAggregator/foodics-product';

@Component({
  selector: 'app-products-needs-attention',
  templateUrl: './products-needs-attention.component.html',
  styleUrls: ['./products-needs-attention.component.scss']
})
export class ProductsNeedsAttentionComponent implements OnInit {

  
  newProductMapping = new ProductMapping();
  newModifierMapping = new ModifierMapping();
  newDiscountMapping = new DiscountMapping();
  newCustomerMapping = new CustomerMapping();
  newAddressMapping = new AddressMapping();

  productsMappingData = [];
  unmappedProductsMappingData = [];
  productsMappingNeedsAttention = [];
  modifierOptionsMappingData = []
  customerMappingData = []
  addressMappingData  = []
  discountMappingData = []

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
    this.getGeneralSettings();
    this.getProductsMapping();
    this.getUnmappedProductsMapping();
    this.getFoodicsProducts();
  }

  fillFormControls(){
    if(this.productsMappingData.length > 0){
      for(let i=0; i < this.productsMappingData.length; i++){
        let controlName = this.getRowFormControlName(this.productsMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        this.tableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.foodicsProductsNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private setFormControlsDefaultOptions() {
    this.productsMappingData.forEach((productMapping) => {
        let productName = this.returnFoodicsProductNameById(productMapping.foodIcsProductId)
        let controlName = this.getRowFormControlName(productMapping)
        Object.keys(this.tableForm.controls).forEach((key : string) => {
          if(controlName === key){
            const abstractControl = this.tableForm.controls[key];
            abstractControl.setValue(productName);
          }
        });
    });
  }

  private returnFoodicsProductNameById(foodicsId){
    for(let i=0; i < this.foodicsProducts.length; i++){
      if(this.foodicsProducts[i].id === foodicsId){
        return this.foodicsProducts[i].name
      }
    }
  }

  getGeneralSettings() {
    this.spinner.show();
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.productsMappingNeedsAttention = this.generalSettings.talabatConfiguration.productsMappingNeedsAttention;
      this.modifierOptionsMappingData = this.generalSettings.talabatConfiguration.modifierMappings;
      this.customerMappingData = this.generalSettings.talabatConfiguration.customerMappings;
      this.addressMappingData = this.generalSettings.talabatConfiguration.addressMappings;
      this.discountMappingData = this.generalSettings.talabatConfiguration.discountMappings;

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
      .getMappedProducts()
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

  getUnmappedProductsMapping(){
    this.spinner.show();
      this.foodicsService
      .getUnMappedProducts()
      .toPromise()
      .then((res) => {
        this.unmappedProductsMappingData = res['data'];
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
        this.foodicsProducts = res['data'];
        this.mapFoodicsProductsNames(this.foodicsProducts)
        this.setFormControlsDefaultOptions()
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

  mapFoodicsProductsNames(products){
    for(let i=0; i < products.length; i++){
      this.foodicsProductsNames.push(products[i].name);
    }
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      const abstractControl = this.tableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }

  onChangeInputEvent(event: any, formControlName){
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      if(formControlName === key){
        const abstractControl = this.tableForm.controls[key];
        this.filteredOptions = abstractControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      }
    });
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

  getRowFormControlName(productMapping){
    //remove spaces from product mapping name
    let formControlName = productMapping.name
    return formControlName.replace(/[^A-Z0-9]+/ig, "")
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
    dialogConfig.data = {product: product};
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


  addDiscountMappingData(){
    if(this.newDiscountMapping.discountId &&  this.newDiscountMapping.discountRate ){
      this.discountMappingData.push(this.newDiscountMapping);
      this.newDiscountMapping = new DiscountMapping();

      this.discountMappingData = [...this.discountMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  addCustomerMappingData(){
    if(this.newCustomerMapping.name &&  this.newCustomerMapping.foodicsId && this.newCustomerMapping.talabatId ){
      this.customerMappingData.push(this.newCustomerMapping);
      this.newCustomerMapping = new CustomerMapping();

      this.customerMappingData = [...this.customerMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

    addAddressMappingData(){
    if(this.newAddressMapping.customerFoodicsId &&  this.newAddressMapping.foodicsId && this.newAddressMapping.talabatId ){
      this.addressMappingData.push(this.newAddressMapping);
      this.newAddressMapping = new AddressMapping();

      this.addressMappingData = [...this.addressMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  onSaveClick(){
    this.spinner.show();

    try {
      let allProductsMapping = this.productsMappingData.concat(this.unmappedProductsMappingData);
      this.generalSettings.talabatConfiguration.productsMappings = allProductsMapping;
      this.generalSettings.talabatConfiguration.modifierMappings = this.modifierOptionsMappingData;
      this.generalSettings.talabatConfiguration.customerMappings = this.customerMappingData;
      this.generalSettings.talabatConfiguration.discountMappings = this.discountMappingData;
      this.generalSettings.talabatConfiguration.addressMappings = this.addressMappingData;

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