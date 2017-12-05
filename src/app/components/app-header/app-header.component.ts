import { Component } from '@angular/core';
import { AccountService } from 'app/accounts/account.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})

export class AppHeaderComponent implements OnInit {
  constructor(
    private accountService: AccountService
  ) { }

  user = {
    authentication: {
      isAuth: undefined,
      userName: undefined
    },
    data: {}
  };

  test = true;

  ngOnInit() {
    this.getAuthData();
    this.getUserData();
    // if (!this.user.authentication.isAuth) {
    //   this.logOut();
    // }
  }

  getAuthData() {
    return this.accountService.getAuthData().subscribe(data => this.user.authentication = data);
  }

  getUserData() {
    return this.accountService.getUserData().subscribe(data => this.user.data = data);
  }

  logOut() {
    this.accountService.logOut();
  }
}
