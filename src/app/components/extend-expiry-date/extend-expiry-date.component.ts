import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-extend-expiry-date',
  templateUrl: './extend-expiry-date.component.html',
  styleUrls: ['./extend-expiry-date.component.scss'],
})
export class ExtendExpiryDateComponent implements OnInit {
  public form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ExtendExpiryDateComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    this.dialogRef.close({
      expiryDate: this.form.controls.expiryDate.value,
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      expiryDate: ["", Validators.required],
    })
  }
}
