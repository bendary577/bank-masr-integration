
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
    ]
})

export class AngularMaterialModule { }