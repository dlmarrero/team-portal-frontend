import { Component, OnInit } from '@angular/core';

import { AccountService } from "../services/account.service";
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
    // .then(function (response) {
    //   // $state.transitionTo('app.main', {}, { reload: true });
    // },
    // function (error_description) {
    //   // $rootScope.$broadcast('messageUpdate', error_description.data.error_description);
    // });
  };
}
