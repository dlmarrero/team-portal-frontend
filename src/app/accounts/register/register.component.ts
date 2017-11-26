import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService,
    private messageService: MessageService) { }

  registration = {};

  validForm = false;

  ngOnInit() {
  }

  signUp() {
    if (this.validForm) {
      this.accountService.register(this.registration)
    } else {
      this.messageService.add("Please properly complete all registration form fields.", false);
    }
  }

}
