import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ModifierMapping } from 'src/app/models/deliveryAggregator/ModifierMapping';
import { ProductMapping } from 'src/app/models/deliveryAggregator/product-mapping';

@Component({
  selector: 'app-foodics-product-details',
  templateUrl: './foodics-product-details.component.html',
  styleUrls: ['./foodics-product-details.component.scss']
})
export class FoodicsProductDetailsComponent implements OnInit {

  product = new  ProductMapping()
  newModifierMapping = new ModifierMapping();

  constructor(public dialogRef: MatDialogRef<FoodicsProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.product = this.data['product'];
  }

  onNoClick(): void {
    this.dialogRef.close({
        save: false,
      }
    )
  }

  onSaveClick(): void {
    this.dialogRef.close({
      save: true,
    })
  }

  addModifierMappingData(){
    if(this.newModifierMapping.name &&  this.newModifierMapping.foodicsProductId && this.newModifierMapping.talabatProductId){
      this.product.modifiers.push(this.newModifierMapping);
      this.newModifierMapping = new ModifierMapping();

      this.product.modifiers = [...this.product.modifiers];
    }else {
      this.snackBar.open('Please fill all modifier fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

}
