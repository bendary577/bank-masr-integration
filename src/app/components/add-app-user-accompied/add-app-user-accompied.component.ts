import { AfterViewChecked, Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { AccompiendGuest } from 'src/app/models/loyalty/AccompiendGuest';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-add-app-user-accompied',
  templateUrl: './add-app-user-accompied.component.html',
  styleUrls: ['./add-app-user-accompied.component.scss']
})
export class AddAppUserAccompiedComponent implements OnInit  {
  public form: FormGroup;
  public accompiendForms: FormGroup[] = [];
  accompiendGuests= [];
  user = new ApplicationUser();
  selectedGroup: String;
  srcResult: any;
  imageUploded: boolean = false;
  inUpdate = false;
  group: Group;
  qrcodeMethod = ["Email", "SMS", "Print"];
  swiped=false;
  cardNumber = 0;
  credit=0;
  // @ViewChild('ChildViewComponent') accompiedNumber = 2 ;
  @Input() accompiedNumber = 0 ;
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
      this.calculateParams();
      console.log(this.user.accompaniedGuests.length)
      for(var i = 0 ; i < this.user.accompaniedGuests.length; i++){
        let accompiendForm:  FormGroup;
        accompiendForm = this.formBuilder.group({
            name: [this.user.accompaniedGuests[i].name, [Validators.maxLength, Validators.required]], 
            email: [this.user.accompaniedGuests[i].email, [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"), Validators.required]],
            mobile: [this.user.accompaniedGuests[i].mobile, [Validators.maxLength, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]], 
        })
        this.accompiendForms.push(accompiendForm);
      }

      this.form = this.formBuilder.group({
        name: [this.user.name, [Validators.maxLength]], 
        email: [this.user.email, [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
        mobile: [this.user.mobile, [Validators.maxLength, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]], 
        group: this.group,
        balance:[this.user.wallet.price],
        expire: [this.user.expire],
        accompanied:[this.user.accompaniedGuests.length],
      });

    }else{
      this.form = this.formBuilder.group({
      group: this.group,
      balance:[100],
      expire:[24],
      name: [''],
      email: [''],
      mobile: [''], 
      accompanied:[0],
      });
  }
}

  calculateParams(){
    let credit = 0;
    let balance = this.user.wallet.balance ;
    for (let i = 0; i < balance.length; i++) {
      credit = credit + balance[i]["amount"];
    }
    this.credit = credit;
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
    }else if (this.cardNumber == 0 || this.cardNumber == undefined || this.cardNumber == null){
      this.snackBar.open("Please enter the card number" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }else{

      let accompiendGuest = new AccompiendGuest();
      
      for(let i = 0 ; i < this.accompiendForms.length ; i++){
        accompiendGuest.name =  this.accompiendForms[i].controls.name.value;
        accompiendGuest.email =  this.accompiendForms[i].controls.email.value;
        accompiendGuest.mobile =  this.accompiendForms[i].controls.mobile.value;

        this.accompiendGuests.push(accompiendGuest);
      }

      this.dialogRef.close({
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        mobile: this.form.controls.mobile.value,
        balance: this.form.controls.balance.value,
        expire: this.form.controls.expire.value,
        group: this.group,
        image: this.srcResult,
        cardCode:this.cardNumber,
        accompiendUsers: this.accompiendGuests
      });
    }
  }

   addAccompiend() {
    this.accompiedNumber = this.accompiedNumber + 1;
    let accompiendForm:  FormGroup;
    accompiendForm = this.formBuilder.group({
        name: ['', [Validators.maxLength, Validators.required]], 
        email: ['', [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"), Validators.required]],
        mobile: ['', [Validators.maxLength, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]], 
    })
    this.accompiendForms.push(accompiendForm);
  }


   giveValues(){}

  hasRole(refernce){ }

  // @Override
  // void ngOnChanges(Map<String, SimpleChange> changes) {
  //   print(changes);
  // }

  onChanges(changes: SimpleChanges) {

    console.log("New Test")
    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
  }

}


