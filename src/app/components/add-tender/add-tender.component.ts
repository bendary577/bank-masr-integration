import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.scss']
})
export class AddTenderComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  newAccount:Account;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddTenderComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.form.controls.name.value,
      account: this.form.controls.account.value,
      communicationTender: this.form.controls.communicationTender.value,
      communicationAccount: this.form.controls.communicationAccount.value,
      communicationRate: this.form.controls.communicationRate.value,
      analysisCodeT5: this.form.controls.analysisCodeT5.value
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      account: ['', Validators.required],
      communicationTender: [''],
      communicationAccount: [''],
      communicationRate: [0],
      analysisCodeT5: [''],
    });
  }
}
