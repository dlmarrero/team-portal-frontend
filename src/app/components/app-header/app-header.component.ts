import { Component } from '@angular/core';
import { AuthService, UserDataService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})

export class AppHeaderComponent {
  constructor(
    private authService: AuthService,
    private userDataService: UserDataService
  ) { }

  logOut() {
    this.authService.logOut();
  }
}