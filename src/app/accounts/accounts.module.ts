import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { AccountService } from "../services/account.service";

import { LoginComponent } from 'app/accounts/login/login.component';
import { AccountRoutingModule } from 'app/accounts/account-routing.module';
import { MessageService } from 'app/services/message.service';
import { MessageComponent } from 'app/services/message.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  declarations: [LoginComponent, MessageComponent],
  exports: [LoginComponent],
  providers: [AccountService, MessageService]
})
export class AccountsModule { }
