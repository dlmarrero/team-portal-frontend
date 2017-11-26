import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatStepperModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule],
})

export class MaterialModule { }
