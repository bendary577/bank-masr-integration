import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.scss']
})
export class AddAppUserComponent implements OnInit {
  public form: FormGroup;
  newUser = new ApplicationUser();
  selectedGroup: String;
  srcResult: any;
  imageUploded: boolean = false;
  inUpdate = false;
  groups: Group[] = [];
  qrcodeMethod = ["Email", "SMS", "Print"];
  swiped=false;
  cardNumber = 0;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppUserComponent>, private loyaltyService: LoyaltyService,
    @Inject(MAT_DIALOG_DATA) public data) { }
 
  ngOnInit() {
    this.getGroups();

    this.swipe();

    if (this.data != undefined && this.data["user"] != null){
      this.inUpdate = true;
      this.newUser = this.data["user"];
      this.selectedGroup = this.newUser.group.id;
      this.form = this.formBuilder.group({
        name: [this.newUser.name, [Validators.maxLength, Validators.required]], 
        qrcodeMethod: [this.qrcodeMethod[0], Validators.required],
        email: [this.newUser.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
        mobile: ['', [Validators.maxLength, Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]], 
        group: [this.newUser.group.id, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
      name: [''],
      qrcodeMethod: ['email'],
      email: [''],
      mobile: [''], 
      price:[100],
      accompanied:[''],
      groupa:['Generic'],
      group: ['']
      });
    }
  }

  getGroups(){
    this.loyaltyService.getAllAppGroups(1).toPromise().then((res: any) => {
      this.groups = res;
    }).catch(err => {
      this.snackBar.open("Can't fetch group, Please try agian.", null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
    });
  }

  csvInputChange(fileInputEvent: any) {
    this.srcResult = fileInputEvent.target.files[0];
    if(this.srcResult){
      this.imageUploded = true;
    }
  }
  
  // async swipe(){
  //   await delay(1000);

  // }

  async swipe() {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), 2500)).then(()=>
    {
      this.swiped = true;
      this.cardNumber = Math.floor(Math.random() *  12354553225);
    });
}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      console.log(this.form.getError)
    }else{
      this.dialogRef.close({
        name: this.form.controls.name.value,
        qrcodeMethod: this.form.controls.qrcodeMethod.value,
        email: this.form.controls.email.value,
        mobile: this.form.controls.mobile.value,
        group: this.form.controls.group.value,
        image: this.srcResult,
      });
    }
  }

}
