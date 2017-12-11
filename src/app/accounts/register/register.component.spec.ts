import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService, MessageService } from '@app/core';
import { SharedModule } from '@app/shared';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [RegisterComponent],
      providers: [MessageService, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Account Form Validators', () => {
    // *** RATE
    it('should mark rate invalid', () => {
      let invalidRates = ['is', 'A', 'CT', 'ctn', 'CTN9', '1S1', 'O1'];
      let control = component.accountFormGroup.controls['rate'];

      control.setValue('is1')
      expect(control.valid).toBeTruthy()

      invalidRates.forEach(rate => {
        control.setValue(rate);
        expect(control.valid).toBeFalsy();
      })
    });

    it('should mark rate valid', () => {
      let validRates = ['itsn', 'itsr', 'Ctnsa', 'CTN1', 'CTNC', 'CTRC', 'ENS', 'lcdr', 'ctn2', 'cTN3']
      let control = component.accountFormGroup.controls['rate'];

      validRates.forEach(rate => {
        control.setValue(rate);
        expect(control.valid).toBeTruthy(`${rate} should be truthy`);
      });
    });
    // RATE ***

    // *** NAME
    it('should mark name invalid', () => {
      let invalidNames = [' keith', 'STEVE ', 'chr1s', '3ric'];
      let control = component.accountFormGroup.controls['fname'];

      invalidNames.forEach(name => {
        control.setValue(name);
        expect(control.valid).toBeFalsy(`${name} should be falsy`);
      });
    });

    it('should mark name valid', () => {
      let validNames = ['marrero', 'Duhaney', 'BROWN'];
      let control = component.accountFormGroup.controls['fname'];

      validNames.forEach(name => {
        control.setValue(name);
        expect(control.valid).toBeTruthy(`${name} should be truthy`);
      });
    });
    // NAME ***

    // *** PASSWORD
    it('should mark password invalid', () => {
      let invalidPws = ['', 'abc123', 'R34 p31$'];
      let control = component.accountFormGroup.controls['password'];

      invalidPws.forEach(pw => {
        control.setValue(pw);
        expect(control.valid).toBeFalsy(`${pw} should be falsy`)
      });
    });

    it('should mark password valid', () => {
      let invalidPws = ['P@ssw0rd', 'k1lL@!', 'QWERTY!@#$%qwerty12345', '1qaz@WSX3edc$RFV'];
      let control = component.accountFormGroup.controls['password'];

      invalidPws.forEach(pw => {
        control.setValue(pw);
        expect(control.valid).toBeTruthy(`${pw} should be falsy`)
      });
    });
    // PASSWORD ***

    // *** CONFIRM PASSWORD
    it('should mark confirm password invalid', () => {
      let control = component.accountFormGroup.controls['confirmpw'];
      component.accountFormGroup.controls['password'].setValue('P@ssw0rd');
      control.setValue('P@SSW0rd1')
      expect(control.valid).toBeFalsy()
    });

    it('should mark confirm password valid', () => {
      let control = component.accountFormGroup.controls['confirmpw'];
      component.accountFormGroup.controls['password'].setValue('P@ssw0rd');
      control.setValue('P@ssw0rd')
      expect(control.valid).toBeTruthy()
    });
  });
});
