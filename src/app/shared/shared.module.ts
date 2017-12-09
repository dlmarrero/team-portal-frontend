import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "./modules/material.module";
import { ObjectFilterPipe } from "./pipes/object-filter.pipe";
import { MessageComponent } from "./components/message.component";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ObjectFilterPipe, MessageComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ObjectFilterPipe,
    MessageComponent
  ]
})
export class SharedModule { }
