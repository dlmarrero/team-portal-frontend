import { Component } from '@angular/core';

import { AccountService } from "../services/account.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService) { }

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
