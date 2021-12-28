import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  modalTitle: string;
  modalMessage: string;
  modalType:ModalType = ModalType.INFO;

  ngOnInit(): void {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
    this.modalType = data.type;
      }

}
export enum ModalType {
  INFO = 'info',
  WARN = 'warn'
}