import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from 'app/accounts/account-routing.module';
import { MaterialModule } from "app/core/modules/material.module";
import { CoreModule } from "app/core/core.module"

import { AuthService } from "app/core/services/auth.service";
import { MessageService } from 'app/core/services/message.service';

import { LoginComponent } from 'app/accounts/login/login.component';
import { RegisterComponent } from 'app/accounts/register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule,
    CoreModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  providers: [AuthService, MessageService]
})
export class AccountsModule { }
