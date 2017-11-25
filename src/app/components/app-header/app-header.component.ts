import { Component } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(
    private accountService: AccountService
  ) { }
  user = {
    authentication: this.accountService.authData
  }
}
