import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvokerUser } from 'src/app/models/InvokerUser';

@Component({
  selector: 'app-view-invoker',
  templateUrl: './view-invoker.component.html',
  styleUrls: ['./view-invoker.component.scss']
})
export class ViewInvokerComponent implements OnInit {
  invoker: InvokerUser = new InvokerUser();

  invokerRolesList = {
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no users yet.</span>
    </div>
  `
    },
    selected: [],
    count: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    data: [], 
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<ViewInvokerComponent>) { }

  ngOnInit(): void {
    this.invoker = this.data["invoker"];
    console.log({
      invoker: this.invoker
    })
    this.invokerRolesList.data = this.invoker.typeId
    this.invokerRolesList.showLoading = false;
  }

  onSelect({selected}) {
    this.invokerRolesList.selected.splice(0, this.invokerRolesList.selected.length);
    this.invokerRolesList.selected.push(...selected);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      invoker: this.invoker,
    });
  }

}
