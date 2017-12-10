import { Component, OnInit } from '@angular/core';

import { AuthService, MessageService } from '@app/core';
import { MessageComponent } from '@app/shared';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    public messageService: MessageService) { }

  loginData = {
    userName: '',
    password: ''
  }
  submitted = false;

  login(): void {
    this.authService.login(this.loginData);
    // TODO:  set spinner when submitted
    this.submitted = true;
  };
}
