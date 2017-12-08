import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatStepperModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule,
  MatNativeDateModule, 
  MatDatepickerModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule
  ]
})

export class MaterialModule { }
