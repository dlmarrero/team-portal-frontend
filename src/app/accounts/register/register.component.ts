import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { MessageService } from 'app/services/message.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validForm = false;
  isLinear = false;
  registration = {}

  ranks = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E9", "E9", "O1", "O2", "O3", "O4", "O5"]
  states = [
    { value: "MD", viewValue: "Maryland" },
    { value: "DC", viewValue: "Washington, DC" },
    { value: "VA", viewValue: "Virginia" }]

  accountFormGroup: FormGroup;
  recallFormGroup: FormGroup;
  adminFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.accountFormGroup = this._formBuilder.group({
      accountData: ['', Validators.required]
    });
    this.recallFormGroup = this._formBuilder.group({
      recallData: ['', Validators.required]
    });
    this.adminFormGroup = this._formBuilder.group({
      adminData: ['', Validators.required]
    });
  }

  signUp() {
    if (this.validForm) {
      this.accountService.register(this.registration)
    } else {
      this.messageService.add("Please properly complete all registration form fields.", false);
    }
  }

}
