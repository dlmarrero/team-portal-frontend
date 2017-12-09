// TODO:  are these necessary?
// import { arrayify } from 'tslint/lib/utils';
// import { Validator } from 'codelyzer/walkerFactory/walkerFn';
// import { error } from 'util';
import { Component, OnInit } from '@angular/core';

import { AuthService, MessageService } from '@app/core';
import { } from '@app/shared';

import { RegistrationData } from "./registration-data.model";
import { PasswordValidators } from './password.validators';
import { matchOtherValidator } from './match-other.validator';
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  passChecker: boolean = true;

  constructor(private _formBuilder: FormBuilder,
    private AuthService: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.accountFormGroup = this._formBuilder.group({
      rate: ['',
        [Validators.required,
        Validators.pattern("(^[A-Z]{2,3}(SN|SA|SR|[123]|C|CS|CM)$)|^ENS$|^LTJG$|^LT$")]],
      rank: ['', Validators.required],
      fname: ['', [Validators.required, Validators.pattern('[a-z,A-Z]*')]],
      lname: ['', [Validators.required, Validators.pattern('[a-z,A-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
        PasswordValidators.cannotContainSpace,
        PasswordValidators.passwordComplexity,
        Validators.minLength(6),
        PasswordValidators.lowerCharacter,
        PasswordValidators.upperCharacter,
        PasswordValidators.numberCharacter,
        ]],
      confirmpw: ['', [Validators.required, matchOtherValidator('password')]],
    });


    this.recallFormGroup = this._formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phone: ['', [Validators.required, Validators.pattern("[2-9]([0-9]{9})")]]
    });

    this.adminFormGroup = this._formBuilder.group({
      adsd: ['', Validators.required],
      heaos: ['', Validators.required],
      seaos: ['', Validators.required],
      prd: ['', Validators.required],
      report: ['', Validators.required],
      tir: ['', Validators.required],
      uic: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      command: ['', Validators.required],
      bluebadge: [false, Validators.required]
    });
  }

  touchPassword() {
    var validCheck = this.accountFormGroup.get('password').status;
    if (validCheck === "")
      return true;
    else
      return false;
  }
  specCharPassword() {
    var validCheck = this.accountFormGroup.get('password').value as string;
    var breakLoop: boolean = false;
    var specChar = ("!`@~#$%^&*()_-\\+=<>?:\"{}|\]{\';,./").split("");
    specChar.forEach(char => {
      (validCheck.split("")).forEach(valch => {
        if (char === valch) {
          breakLoop = true;
        }
      });
    });
    return breakLoop;
  }

  upperCharPassword() {
    var validCheck = this.accountFormGroup.get('password').value as string;
    var breakLoop: boolean = false;
    var upperChar = ("QWERTYUIOPASDFGHJKLZXCVBNM").split("");
    upperChar.forEach(char => {
      (validCheck.split("")).forEach(valch => {
        if (char === valch) {
          breakLoop = true;
        }
      });
    });
    return breakLoop;
  }

  lowerCharPassword() {
    var validCheck = this.accountFormGroup.get('password').value as string;
    var breakLoop: boolean = false;
    var lowerChar = ("qwertyuiopasdfghjklzxcvbnm").split("");
    lowerChar.forEach(char => {
      (validCheck.split("")).forEach(valch => {
        if (char === valch) {
          breakLoop = true;
        }
      });
    });
    return breakLoop;
  }

  numberCharPassword() {
    var validCheck = this.accountFormGroup.get('password').value as string;
    var breakLoop: boolean = false;
    var numberChar = ("0123456789").split("");
    numberChar.forEach(char => {
      (validCheck.split("")).forEach(valch => {
        if (char === valch) {
          breakLoop = true;
        }
      });
    });
    return breakLoop;
  }

  signUp() {
    if (this.recallFormGroup.valid && this.accountFormGroup.valid && this.adminFormGroup.valid) {
      this.AuthService.register(this.registration)
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
    const loginData = {
      userName: `${registrationData.firstName}.${registrationData.lastName}`,
      password: registrationData.password
    };

    this.AuthService.login(loginData);
  }
}
