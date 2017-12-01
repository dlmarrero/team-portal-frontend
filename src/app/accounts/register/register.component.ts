import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { MessageService } from 'app/services/message.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistrationData } from "app/models/registration-data.model";
import { LoginData } from "app/models/login-data.model";
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { error } from 'util';
import { PasswordValidators } from 'app/accounts/register/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registration: RegistrationData;

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
    this.createForms();
  }

  createForms() {
    this.accountFormGroup = this._formBuilder.group({
      rate: ['', [Validators.required, Validators.pattern("[a-z,A-Z]{2,3}-?[1-9]")]],
      rank: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordValidators.cannotContainSpace]],
      confirmpw: ['', Validators.required]
    });

    this.recallFormGroup = this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.adminFormGroup = this._formBuilder.group({
      adsd: ['', Validators.required],
      heaos: ['', Validators.required],
      seaos: ['', Validators.required],
      prd: ['', Validators.required],
      report: ['', Validators.required],
      tir: ['', Validators.required],
      uic: ['', Validators.required],
      command: ['', Validators.required],
      bluebadge: [false, Validators.required]
    });
  }

  signUp() {
    if (this.recallFormGroup.valid && this.accountFormGroup.valid && this.adminFormGroup.valid) {
      this.registration = this.prepareRegistration();
      this.accountService.register(this.registration)
        .subscribe(data => {
          this.messageService.add('Regisration successful!  Logging you in...', true)
          this.forwardToLogin(this.registration);
        }, (err: HttpErrorResponse) => {
          // TODO:  this will be redundant after form validation is in place.
          //        what other types of errors might surface? 500 errors...
          let message = '';
          for (let value in err.error.modelState) {
            err.error.modelState[value].forEach(error => {
              message += error + ' / ';
            });
          };
          this.messageService.add(message, false)
        });
    } else {
      this.messageService.add('Please fill out all fields before submitting.', false)
    }
  }

  prepareRegistration(): RegistrationData {
    const accountFormData = this.accountFormGroup.value;
    const recallFormData = this.recallFormGroup.value;
    const adminFormData = this.adminFormGroup.value;

    const newRegistration: RegistrationData = {
      rate: accountFormData.rate as string,
      rank: accountFormData.rank as string,
      firstName: accountFormData.fname as string,
      lastName: accountFormData.lname as string,
      email: accountFormData.email as string,
      password: accountFormData.password as string,
      confirmPassword: accountFormData.confirmpw as string,

      street: recallFormData.street as string,
      city: recallFormData.city as string,
      state: recallFormData.state as string,
      zip: recallFormData.zip as string,
      phoneNumber: recallFormData.phone as string,

      adsd: adminFormData.adsd as string,
      heaos: adminFormData.heaos as string,
      seaos: adminFormData.seaos as string,
      prd: adminFormData.prd as string,
      reportDate: adminFormData.report as string,
      tirDate: adminFormData.tir as string,
      blueBadge: adminFormData.bluebadge as boolean,
      destCommand: adminFormData.command as string,
      destUIC: adminFormData.uic as string
    };

    return newRegistration;
  }

  forwardToLogin(registrationData) {
    const loginData: LoginData = {
      userName: `${registrationData.firstName}.${registrationData.lastName}`,
      password: registrationData.password
    };

    this.accountService.login(loginData);
  }
}
