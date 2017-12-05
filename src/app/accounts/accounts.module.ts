import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from 'app/accounts/account-routing.module';
import { MaterialModule } from "app/material/material.module";

import { AccountService } from "./account.service";
import { MessageService } from 'app/services/message.service';

import { LoginComponent } from 'app/accounts/login/login.component';
import { MessageComponent } from 'app/services/message.component';
import { RegisterComponent } from 'app/accounts/register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule
  ],
  declarations: [LoginComponent, MessageComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AccountService, MessageService]
})
export class AccountsModule { }
