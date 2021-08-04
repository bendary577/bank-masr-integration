import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-add-app-user-accompied',
  templateUrl: './add-app-user-accompied.component.html',
  styleUrls: ['./add-app-user-accompied.component.scss']
})
export class AddAppUserAccompiedComponent implements OnInit {
  public form: FormGroup;
  public accompiendForms: FormGroup[] = [];
  user = new ApplicationUser();
  selectedGroup: String;
  srcResult: any;
  imageUploded: boolean = false;
  inUpdate = false;
  group: Group;
  qrcodeMethod = ["Email", "SMS", "Print"];
  swiped=false;
  cardNumber = 0;
  @Input() accompiedNumber ;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppUserAccompiedComponent>, private loyaltyService: LoyaltyService,
    @Inject(MAT_DIALOG_DATA) public data) { }
 
  ngOnInit() {
    this.getGenericGroup();

    this.swipe();

    if (this.data != undefined && this.data["user"] != null){
      this.inUpdate = true;
      this.user = this.data["user"];
      this.selectedGroup = this.user.group.id;
      this.form = this.formBuilder.group({
        name: [this.user.name, [Validators.maxLength]], 
        email: [this.user.email, [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
        mobile: ['', [Validators.maxLength, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]], 
        group: this.group,
        balance:[this.user.wallet.price],
        accompanied:[this.user.accompanied.length],
      });

      for(var i = 0 ; i < this.user.accompanied.length; i++){

      }

    }else{
      this.form = this.formBuilder.group({
      group: this.group,
      balance:[100],
      name: [''],
      email: [''],
      mobile: [''], 
      accompanied:[''],
      });

      
      for(var i = 0 ; i < this.form.controls.accompanied.value; i++){

        let accompiendForm:  FormGroup;

        accompiendForm = this.formBuilder.group({
          name: [''],
          email: [""],
          mobile: [''],
        })

        this.accompiendForms.push(accompiendForm);
      }
    }
  }

  getGenericGroup(){
    this.loyaltyService.getGenericGroup().toPromise().then((res: any) => {
      this.group = res;
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
        email: this.form.controls.email.value,
        mobile: this.form.controls.mobile.value,
        balance:this.form.controls.balance.value,
        group: this.group,
        image: this.srcResult,
      });
    }
  }

  giveValues(){

  }

}
