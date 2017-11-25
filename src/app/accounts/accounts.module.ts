import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from "../services/account.service";
import { MessageService } from "../services/message.service";

import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AccountService, MessageService]
})
export class AccountsModule { }
