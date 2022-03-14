
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
import { AddressMapping } from 'src/app/models/talabat/address-mapping';
import { BranchMapping } from 'src/app/models/talabat/branch-mapping';
import { CustomerMapping } from 'src/app/models/talabat/customer-mapping';
import { DiscountMapping } from 'src/app/models/talabat/discount-mapping';
import { ProductMapping } from 'src/app/models/talabat/product-mapping';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';


@Component({
  selector: 'app-aggregator-products',
  templateUrl: './aggregator-products.component.html',
  styleUrls: ['./aggregator-products.component.scss']
})
export class AggregatorProductsComponent implements OnInit {

  newProductMapping = new ProductMapping();
  newBranchMapping = new BranchMapping();
  newDiscountMapping = new DiscountMapping();
  newCustomerMapping = new CustomerMapping();
  newAddressMapping = new AddressMapping();

  branchMappingData = []
  productsMappingData = []
  customerMappingData = []
  addressMappingData = []
  discountMappingData = []

  showLoading: boolean;
  message: 'No data yet';

  generalSettings: GeneralSettings = new GeneralSettings();

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      console.log(this.generalSettings)

      this.generalSettings = res as GeneralSettings;
      this.branchMappingData = this.generalSettings.talabatConfiguration.branchMappings;
      this.productsMappingData = this.generalSettings.talabatConfiguration.productsMappings;
      this.customerMappingData = this.generalSettings.talabatConfiguration.customerMappings;
      this.addressMappingData = this.generalSettings.talabatConfiguration.addressMappings;
      this.discountMappingData = this.generalSettings.talabatConfiguration.discountMappings;

      this.spinner.hide();
    }).catch(err => {
      let message = "";
      if (err.error) {
        message = err.error;
      } else if (err.message) {
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG;
      }

      this.snackBar.open(message, null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
      this.spinner.hide();
    });
  }

  addProductsMappingData() {
    if (this.newProductMapping.name && this.newProductMapping.foodIcsProductId && this.newProductMapping.talabatProductId) {
      this.productsMappingData.push(this.newProductMapping);
      this.newProductMapping = new ProductMapping();

      this.productsMappingData = [...this.productsMappingData];
    } else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }
  }

  addBranchMappingData() {
    if (this.newBranchMapping.name && this.newBranchMapping.foodIcsBranchId && this.newBranchMapping.talabatBranchId) {
      this.branchMappingData.push(this.newBranchMapping);
      this.newBranchMapping = new BranchMapping();

      this.branchMappingData = [...this.branchMappingData];
    } else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }
  }

  addDiscountMappingData() {
    if (this.newDiscountMapping.discountId && this.newDiscountMapping.discountRate) {
      this.discountMappingData.push(this.newDiscountMapping);
      this.newDiscountMapping = new DiscountMapping();

      this.discountMappingData = [...this.discountMappingData];
    } else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }
  }

  addCustomerMappingData() {
    if (this.newCustomerMapping.name && this.newCustomerMapping.foodicsId && this.newCustomerMapping.talabatId) {
      this.customerMappingData.push(this.newCustomerMapping);
      this.newCustomerMapping = new CustomerMapping();

      this.customerMappingData = [...this.customerMappingData];
    } else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }
  }

  addAddressMappingData() {
    if (this.newAddressMapping.customerFoodicsId && this.newAddressMapping.foodicsId && this.newAddressMapping.talabatId) {
      this.addressMappingData.push(this.newAddressMapping);
      this.newAddressMapping = new AddressMapping();

      this.addressMappingData = [...this.addressMappingData];
    } else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    }
  }

  onSaveClick() {
    this.spinner.show();

    try {

      this.generalSettings.talabatConfiguration.productsMappings = this.productsMappingData;
      this.generalSettings.talabatConfiguration.branchMappings = this.branchMappingData;
      this.generalSettings.talabatConfiguration.customerMappings = this.customerMappingData;
      this.generalSettings.talabatConfiguration.discountMappings = this.discountMappingData;
      this.generalSettings.talabatConfiguration.addressMappings = this.addressMappingData;

      console.log(this.generalSettings)

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        console.log(this.generalSettings)

        const response = result as Response;
        this.authService.generalSettings = this.generalSettings;
        if (response.success) {
          this.snackBar.open('Integration data saved successfully.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: "my-snack-bar-success"
          });
        } else {
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: "my-snack-bar-fail"
          });
        }
        this.spinner.hide();
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
        });
        this.spinner.hide();
      });
    } catch (e) {
      this.snackBar.open('Failed to save simphony discount rates, Please try again.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });

      this.spinner.hide();
    }
  }

}

