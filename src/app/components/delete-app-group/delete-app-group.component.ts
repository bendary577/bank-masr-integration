import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-delete-app-group',
  templateUrl: './delete-app-group.component.html',
  styleUrls: ['./delete-app-group.component.scss']
})
export class DeleteAppGroupComponent implements OnInit {
  public form: FormGroup;
  isDelete : boolean = false;
  withUsers: boolean = true;
  groups: Group[];
  parentGroup: Group;

  constructor(private formBuilder: FormBuilder, private loyaltyService: LoyaltyService,
    public dialogRef: MatDialogRef<DeleteAppGroupComponent>, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    if(this.data != undefined && this.data["isDelete"]){
      this.isDelete = this.data["isDelete"];
    }

    this.getGroups(false, new Group);
    this.form = this.formBuilder.group({
    withUsers: [this.withUsers],
    parentGroup: [this.parentGroup]
    });   
   }

  getGroups(isParent, group){
    this.loyaltyService.getAllAppGroups(1).toPromise().then((res: any) => {
      this.groups= res;
    }).catch(err => {
    });
  }
  
  updateDeleteUsers(deleteUsers){
     console.log(deleteUsers)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      console.log("check form value : "+this.form.controls.withUsers.value)
      this.dialogRef.close({
        withUsers: this.form.controls.withUsers.value,
        parentGroup: this.form.controls.parentGroup.value,
      });
    }
  }

}
