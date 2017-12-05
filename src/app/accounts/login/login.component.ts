import { Component, OnInit } from '@angular/core';

import { AuthService } from "app/core/services/auth.service";
import { MessageService } from 'app/core/services/message.service';
import { MessageComponent } from "app/core/components/message.component";


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    public messageService: MessageService) { }

  loginData = {
    userName: '',
    password: ''
  }

  ngOnInit() {
  }

  login(): void {
    this.AuthService.login(this.loginData);
  };
}
