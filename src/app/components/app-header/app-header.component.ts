import { Component } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { UserDataService } from "app/core/services/user-data.service";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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