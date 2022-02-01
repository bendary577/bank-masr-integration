import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SideNaveComponent } from '../../side-nave/side-nave.component';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-add-reward-points-user',
  templateUrl: './add-reward-points-user.component.html',
  styleUrls: ['./add-reward-points-user.component.scss']
})
export class AddRewardPointsUserComponent implements OnInit {
  public form: FormGroup;
  newUser = new ApplicationUser();
  selectedGroup: String;
  srcResult: any;
  imageUploded: boolean = false;
  inUpdate = false;
  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddRewardPointsUserComponent>, 
    private loyaltyService: LoyaltyService,
    private sidNav: SideNaveComponent,
    @Inject(MAT_DIALOG_DATA) public data) { }
 
  ngOnInit() {
    this.getGroups();

    if (this.data != undefined && this.data["user"] != null){
      this.inUpdate = true;
      this.newUser = this.data["user"];
      this.selectedGroup = this.newUser.group.id;
      let birthdateString = moment(this.newUser.birthDate).format('YYYY-MM-DD');
      this.form = this.formBuilder.group({
        name: [this.newUser.name, Validators.required],        
        email: [this.newUser.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
        group: [this.newUser.group, Validators.required],
        points: [this.newUser.points],
        birthDate: [birthdateString],
        code: [this.newUser.code]
      });
    }else{
      this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
      group: ['', Validators.required],
      points: [''],
      birthDate: ['1999-01-01'],
      code: ['']
      });
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  hasFeature(reference) {
    return this.sidNav.hasFeature(reference)
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
    }else{
      this.dialogRef.close({
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        group: this.form.controls.group.value,
        points: this.form.controls.points.value,
        birthDate: this.form.controls.birthDate.value,
        image: this.srcResult,
        code: this.form.controls.code.value,
      });
    }
  }

}
