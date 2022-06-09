import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
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
import { FoodicsModifier } from 'src/app/models/deliveryAggregator/foodics-modifier';
import { AggregatorIntegrationErrorComponent } from '../aggregator-integration-error/aggregator-integration-error.component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'app-talabat-mapping',
  templateUrl: './talabat-mapping.component.html',
  styleUrls: ['./talabat-mapping.component.scss']
})
export class TalabatMappingComponent implements OnInit {

  newProductMapping = new ProductMapping();
  newModifierMapping = new ModifierMapping();

  productsMappingData = [];
  unmappedProductsMappingData = [];
  modifierOptionsMappingData = []

  showLoading: boolean;
  message: 'No data yet';

  generalSettings: GeneralSettings = new GeneralSettings();

  foodicsProducts  : FoodicsProduct[] = [];
  foodicsModifiers  : FoodicsModifier[] = [];
  foodicsProductsNames = [];
  foodicsModifiersNames = [];
  myControl = new FormControl();
  formControls : FormControl[] = []
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  filteredModifiersOptions: Observable<string[]>;
  tableForm = new FormGroup({});
  modifiersTableForm = new FormGroup({});
  modifiersSecondTableForm = new FormGroup({});
  integrationComplete;
  // @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  // @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService
    , private talabatService: TalabatService,private foodicsService: FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      if(this.generalSettings.talabatConfiguration.integrationStatus){
          this.integrationComplete=true;
          this.productsMappingData = this.generalSettings.talabatConfiguration.productsMappings;
          this.unmappedProductsMappingData = this.generalSettings.talabatConfiguration.unMappedProductsMappings;
          this.modifierOptionsMappingData = this.generalSettings.talabatConfiguration.modifierMappings;
          this.foodicsProducts = this.generalSettings.talabatConfiguration.foodicsDropDownProducts;
          this.foodicsModifiers = this.generalSettings.talabatConfiguration.foodicsDropDownModifiers;
          if(this.modifierOptionsMappingData == undefined){
            this.modifierOptionsMappingData = [];
          }

          this.mapFoodicsProductsNames(this.foodicsProducts);
          
          this.mapFoodicsModifiersNames(this.foodicsModifiers);


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

  fillFormControls(){
    if(this.productsMappingData.length > 0){
      for(let i=0; i < this.productsMappingData.length; i++){
        let controlName = this.getRowFormControlName(this.productsMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        this.tableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
      this.setFormControlsDefaultOptions()
    }
  }

  fillFormControlsModifiers(){

    if(this.modifierOptionsMappingData.length > 0){
      for(let i=0; i < this.modifierOptionsMappingData.length; i++){
        let controlName = this.getRowFormControlNameModifier(this.modifierOptionsMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        this.modifiersTableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
      this.setFormControlsDefaultOptionsModifiers()
    }
  }

  fillFormControlsSecondModifiers(){
    if(this.modifierOptionsMappingData.length > 0){
      for(let i=0; i < this.modifierOptionsMappingData.length; i++){
        let controlName = this.getRowFormControlNameModifier(this.modifierOptionsMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        this.modifiersSecondTableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
      this.setFormControlsDefaultOptionsSecondModifiers()
    }
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.foodicsProductsNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterModifiers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.foodicsModifiersNames.filter(option => option.toLowerCase().includes(filterValue));
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

  private setFormControlsDefaultOptionsModifiers() {
    this.modifierOptionsMappingData.forEach((modifierMapping) => {
        let modifierName = this.returnFoodicsModifierNameById(modifierMapping.foodicsProductId)
        let controlName = this.getRowFormControlNameModifier(modifierMapping)
        Object.keys(this.modifiersTableForm.controls).forEach((key : string) => {
          if(controlName === key){
            const abstractControl = this.modifiersTableForm.controls[key];
            abstractControl.setValue(modifierName);
          }
        });
    });
  }

  private setFormControlsDefaultOptionsSecondModifiers() {
    this.modifierOptionsMappingData.forEach((modifierMapping) => {
        let modifierName = this.returnFoodicsModifierNameById(modifierMapping.secondFoodicsProductId)
        let controlName = this.getRowFormControlNameModifier(modifierMapping)
        Object.keys(this.modifiersSecondTableForm.controls).forEach((key : string) => {
          if(controlName === key){
            const abstractControl = this.modifiersSecondTableForm.controls[key];
            abstractControl.setValue(modifierName);
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

  
  private returnFoodicsModifierNameById(foodicsId){
    for(let i=0; i < this.foodicsModifiers.length; i++){
      if(this.foodicsModifiers[i].id === foodicsId){
        return this.foodicsModifiers[i].name
      }
    }
  }

  productInputClick() {
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      const abstractControl = this.tableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }

  modifierInputClick() {
    Object.keys(this.modifiersTableForm.controls).forEach((key : string) => {
      const abstractControl = this.modifiersTableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModifiers(value)),
      );
    });
  }

  secondModifierInputClick() {
    Object.keys(this.modifiersSecondTableForm.controls).forEach((key : string) => {
      const abstractControl = this.modifiersSecondTableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModifiers(value)),
      );
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
    this.fillFormControls()
  }

  mapFoodicsModifiersNames(modifiers){
    for(let i=0; i < modifiers.length; i++){
      this.foodicsModifiersNames.push(modifiers[i].name);
    }
    Object.keys(this.modifiersTableForm.controls).forEach((key : string) => {
      const abstractControl = this.modifiersTableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterModifiers(value)),
      );
    });
    this.fillFormControlsModifiers()
    this.fillFormControlsSecondModifiers()
  }

  mapInputModel(productMapping){
    return this.returnFoodicsProductNameById(productMapping.foodIcsProductId);
  }

  mapInputModelModifier(modifierMapping){
    return this.returnFoodicsModifierNameById(modifierMapping.foodicsProductId);
  }

  onChangeInputEvent(event: any, formControlName){
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

  onChangeInputEventModifier(event: any, formControlName){
    Object.keys(this.modifiersTableForm.controls).forEach((key : string) => {
      if(formControlName === key){
        const abstractControl = this.modifiersTableForm.controls[key];
        if(event !== "" && event !== '' && event !== undefined && event != null){
          this.filteredModifiersOptions = abstractControl.valueChanges.pipe(
            startWith(event),
            map(value => this._filterModifiers(value)),
          );
        }
      }
    });
  }

  onChangeInputEventSecondModifier(event: any, formControlName){
    Object.keys(this.modifiersSecondTableForm.controls).forEach((key : string) => {
      if(formControlName === key){
        const abstractControl = this.modifiersSecondTableForm.controls[key];
        if(event !== "" && event !== '' && event !== undefined && event != null){
          this.filteredModifiersOptions = abstractControl.valueChanges.pipe(
            startWith(event),
            map(value => this._filterModifiers(value)),
          );
        }
      }
    });
  }

  fetchProducts(){
    if(this.integrationComplete){
      this.spinner.show();
      this.talabatService.getTalabatMenuItems().toPromise().then((res) => {
        this.getGeneralSettings();
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
    }else{
      this.snackBar.open("You must finish the integration step before start getting products mapping" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  getRowFormControlName(productMapping){
    //remove spaces from product mapping name
    let formControlName = productMapping.name
    let newName = formControlName.replace(/[^A-Z]+/ig, "")
    return newName;
  }

  getRowFormControlNameModifier(modifierMapping){
    let formControlName = modifierMapping.name
    return formControlName.replace(/[^A-Z]+/ig, "")
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

  changeFoodicsModifierMapping(value, modifierMapping) {
    let chosenFoodicsModifier : FoodicsModifier[] = [];
    chosenFoodicsModifier = this.foodicsModifiers.filter(function(foodicsModifier) {
      return foodicsModifier.name === value;
    });

    if(chosenFoodicsModifier != null && chosenFoodicsModifier.length > 0){
      modifierMapping.foodicsProductId = chosenFoodicsModifier[0].id
    }
    this.filteredModifiersOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterModifiers(value)),
    );
  }

  changeSecondFoodicsModifierMapping(value, modifierMapping) {
    let chosenFoodicsModifier : FoodicsModifier[] = [];
    chosenFoodicsModifier = this.foodicsModifiers.filter(function(foodicsModifier) {
      return foodicsModifier.name === value;
    });

    if(chosenFoodicsModifier != null && chosenFoodicsModifier.length > 0){
      modifierMapping.secondFoodicsProductId = chosenFoodicsModifier[0].id
    }
    this.filteredModifiersOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterModifiers(value)),
    );
  }

  onSaveClick(){
    this.spinner.show();

    try {
      this.generalSettings.talabatConfiguration.productsMappings = this.productsMappingData;
      this.generalSettings.talabatConfiguration.unMappedProductsMappings = this.unmappedProductsMappingData;
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

    // getProductsMapping() {
  //   this.spinner.show();
  //     this.foodicsService
  //     .getMappedProducts()
  //     .toPromise()
  //     .then((res) => {
  //       this.productsMappingData = res['data'];

  //       this.spinner.hide();
  //   }).catch(err => {
  //     let message = "";
  //     if (err.error){
  //       message = err.error;
  //     } else if (err.message){
  //       message = err.message;
  //     } else {
  //       message = ErrorMessages.FAILED_TO_GET_CONFIG;
  //     }
  //     this.snackBar.open(message , null, {
  //       duration: 3000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //     this.spinner.hide();
  //   });
  // }

  // getUnmappedProductsMapping(){
  //   this.spinner.show();
  //     this.foodicsService
  //     .getUnMappedProducts()
  //     .toPromise()
  //     .then((res) => {
  //       this.unmappedProductsMappingData = res['data'];
  //       this.spinner.hide();
  //   }).catch(err => {
  //     let message = "";
  //     if (err.error){
  //       message = err.error;
  //     } else if (err.message){
  //       message = err.message;
  //     } else {
  //       message = ErrorMessages.FAILED_TO_GET_CONFIG;
  //     }
  //     this.snackBar.open(message , null, {
  //       duration: 3000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //     this.spinner.hide();
  //   });
  // }


    // addModifierMappingData(){
  //   if(this.newModifierMapping.name &&  this.newModifierMapping.foodicsProductId ){

  //     this.modifierOptionsMappingData.push(this.newModifierMapping);
  //     // let modifier = new ModifierMapping();
  //     // modifier.name = this.newModifierMapping.name
  //     // modifier.foodicsProductId = this.newModifierMapping.foodicsProductId
  //     // modifier.secondFoodicsProductId = this.newModifierMapping.secondFoodicsProductId
  //     // modifier.talabatProductId = this.newModifierMapping.talabatProductId
  //     // this.modifierOptionsMappingData.push(modifier);
  //     this.newModifierMapping = new ModifierMapping();
  //     this.modifierOptionsMappingData = [...this.modifierOptionsMappingData];

  //   }else {
  //     this.snackBar.open('Please fill all modifier fields.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   }
  // }


  // addDiscountMappingData(){
  //   if(this.newDiscountMapping.discountId &&  this.newDiscountMapping.discountRate ){
  //     this.discountMappingData.push(this.newDiscountMapping);
  //     this.newDiscountMapping = new DiscountMapping();

  //     this.discountMappingData = [...this.discountMappingData];
  //   }else {
  //     this.snackBar.open('Please fill all type fields.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   }
  // }

  // addCustomerMappingData(){
  //   if(this.newCustomerMapping.name &&  this.newCustomerMapping.foodicsId && this.newCustomerMapping.talabatId ){
  //     this.customerMappingData.push(this.newCustomerMapping);
  //     this.newCustomerMapping = new CustomerMapping();

  //     this.customerMappingData = [...this.customerMappingData];
  //   }else {
  //     this.snackBar.open('Please fill all type fields.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   }
  // }

  // addAddressMappingData(){
  //   if(this.newAddressMapping.customerFoodicsId &&  this.newAddressMapping.foodicsId && this.newAddressMapping.talabatId ){
  //     this.addressMappingData.push(this.newAddressMapping);
  //     this.newAddressMapping = new AddressMapping();

  //     this.addressMappingData = [...this.addressMappingData];
  //   }else {
  //     this.snackBar.open('Please fill all type fields.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   }
  // }

    // addProductsMappingData(){
  //   if(this.newProductMapping.name &&  this.newProductMapping.foodIcsProductId && this.newProductMapping.talabatProductId){
  //     this.productsMappingData.push(this.newProductMapping);
  //     this.newProductMapping = new ProductMapping();

  //     this.productsMappingData = [...this.productsMappingData];
  //   }else {
  //     this.snackBar.open('Please fill all type fields.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   }
  // }


}
