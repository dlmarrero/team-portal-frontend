import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/core/services/auth.service';
import { MessageService } from 'app/core/messages/message.service';
import { MessageComponent } from 'app/shared/components/message.component';

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

  login(): void {
    this.authService.login(this.loginData);
  };
}
