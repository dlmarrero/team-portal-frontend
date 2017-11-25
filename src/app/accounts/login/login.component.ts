import { Component, OnInit } from '@angular/core';

import { AccountService } from "app/services/account.service";
import { MessageService } from 'app/services/message.service';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    public messageService: MessageService) { }

  loginData = {
    userName: '',
    password: ''
  }

  ngOnInit() {
  }

  login(): void {
    this.accountService.login(this.loginData);
  };
}
