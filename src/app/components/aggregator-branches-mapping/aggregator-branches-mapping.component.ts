import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
import { BranchMapping } from 'src/app/models/deliveryAggregator/branch-mapping';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { TalabatService } from 'src/app/services/talabat/talabat.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import {Observable} from 'rxjs';
import { FoodicsBranch } from 'src/app/models/deliveryAggregator/foodics-branch';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { AggregatorIntegrationErrorComponent } from '../aggregator-integration-error/aggregator-integration-error.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-aggregator-branches-mapping',
  templateUrl: './aggregator-branches-mapping.component.html',
  styleUrls: ['./aggregator-branches-mapping.component.scss']
})
export class AggregatorBranchesMappingComponent implements OnInit {

  newBranchMapping = new BranchMapping();

  branchMappingData   = []

  showLoading: boolean;
  message: 'No data yet';

  generalSettings: GeneralSettings = new GeneralSettings();

  foodicsBranches  : FoodicsBranch[] = [];
  foodicsBranchesNames = [];
  formControls : FormControl[] = []
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  tableForm = new FormGroup({});
  integrationComplete = false;
  
  constructor(public snackBar: MatSnackBar,private router: Router, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService
    , private talabatService: TalabatService, private foodicsService : FoodicsServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }

  fillFormControls(){
    if(this.branchMappingData.length > 0){
      for(let i=0; i < this.branchMappingData.length; i++){
        let controlName = this.getRowFormControlName(this.branchMappingData[i])
        let value = new FormControl();
        eval("var "+controlName+" = '"+value+"';");
        this.tableForm.addControl(controlName,  new FormControl('', Validators.required));
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.foodicsBranchesNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  private setFormControlsDefaultOptions() {
    this.branchMappingData.forEach((branchMapping) => {
        let branchName = this.returnFoodicsBranchNameById(branchMapping.foodIcsBranchId)
        let controlName = this.getRowFormControlName(branchMapping)
        Object.keys(this.tableForm.controls).forEach((key : string) => {
          if(controlName === key){
            const abstractControl = this.tableForm.controls[key];
            abstractControl.setValue(branchName);
          }
        });
    });
  }

  getRowFormControlName(branchMapping){
    //remove spaces from branch mapping name
    let formControlName = branchMapping.name
    return formControlName.replace(/[^A-Z0-9]+/ig, "")
  }

  private returnFoodicsBranchNameById(foodicsId){
    for(let i=0; i < this.foodicsBranches.length; i++){
      if(this.foodicsBranches[i].id === foodicsId){
        return this.foodicsBranches[i].name
      }
    }
  }

  changeFoodicsBranchMapping(value, branchMapping) {
    let chosenFoodicsBranch : FoodicsBranch[] = [];
    chosenFoodicsBranch = this.foodicsBranches.filter(function(foodicsBranch) {
      return foodicsBranch.name === value;
    });

    if(chosenFoodicsBranch != null && chosenFoodicsBranch.length > 0){
      branchMapping.foodIcsBranchId = chosenFoodicsBranch[0].id
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
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

  mapInputModel(branchMapping){
    return this.returnFoodicsBranchNameById(branchMapping.foodIcsBranchId);
  }

  mapFoodicsBranchesNames(branches){
    for(let i=0; i < branches.length; i++){
      this.foodicsBranchesNames.push(branches[i].name);
    }
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      const abstractControl = this.tableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }


  // fetchBranches(){
  //   this.spinner.show();
  //   this.foodicsService.getFoodicsBranches(1,2).toPromise().then((res) => {
  //       this.foodicsBranches = res['data'];
  //       this.getGeneralSettings()
  //     this.spinner.hide();
  //   }).catch(err => {
  //     const dialogConfig = new MatDialogConfig()
  //     dialogConfig.width = '600px'
  //     dialogConfig.maxWidth = '600px'
  //     dialogConfig.autoFocus = true
  
  //     let dialogRef = this.dialog.open(AggregatorIntegrationErrorComponent, dialogConfig)
  
  //     dialogRef.afterClosed().subscribe((res) => {})
  //     this.spinner.hide();
  //   });
  // }

  getGeneralSettings() {
      this.showLoading=true;
      this.spinner.show();
      this.generalSettingsService.getGeneralSettings().then((res) => {
        this.generalSettings = res as GeneralSettings;
        if(this.generalSettings.talabatConfiguration.integrationStatus){
          this.integrationComplete = true
          this.branchMappingData = this.generalSettings.talabatConfiguration.branchMappings;
          this.foodicsBranches = this.generalSettings.talabatConfiguration.foodicsDropDownBranches;
          this.mapFoodicsBranchesNames(this.foodicsBranches)
          this.fillFormControls()
          this.setFormControlsDefaultOptions()
          this.spinner.hide();
        }
        this.showLoading=false;
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
        this.showLoading=false;
        this.spinner.hide();
      });
  }

  addBranchMappingData(){
    if(this.newBranchMapping.name &&  this.newBranchMapping.foodIcsBranchId && this.newBranchMapping.talabatBranchId){
      this.branchMappingData.push(this.newBranchMapping);
      this.newBranchMapping = new BranchMapping();

      this.branchMappingData = [...this.branchMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }


  setDefaultBranch(branchMapping){
    for(let i =0; i < this.branchMappingData.length; i++){
      if(this.branchMappingData[i].talabatBranchId === branchMapping.talabatBranchId){
        this.branchMappingData[i].defaultBranch = true
      }else{
        if(this.branchMappingData[i].defaultBranch === true){
          this.branchMappingData[i].defaultBranch = false
        }
      }
    }
  }

  routeToConfigurations(){
    this.router.navigate(['/main/aggregatorsConfigurations'])
  }

  branchInputClick() {
    Object.keys(this.tableForm.controls).forEach((key : string) => {
      const abstractControl = this.tableForm.controls[key];
      this.filteredOptions = abstractControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    });
  }

  onSaveClick(){
    this.spinner.show();

    try {

      this.generalSettings.talabatConfiguration.branchMappings = this.branchMappingData;

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
}
