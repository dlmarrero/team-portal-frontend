import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from 'app/accounts/login/login.component';
import { MessageComponent } from 'app/core/components/message.component';
import { MessageService } from 'app/core/services/message.service';
import { AuthService } from 'app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective } from 'testing/router-stubs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let el;

    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientModule, RouterTestingModule],
            declarations: [LoginComponent, MessageComponent, RouterLinkStubDirective],
            providers: [MessageService, AuthService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        el = fixture.nativeElement;
        fixture.detectChanges();

        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));

        // get the attached link directive instances using the DebugElement injectors
        links = linkDes
            .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create loginData object when form inputs are filled and submit on button click', () => {
        let expectedUsername = "portal.admin";
        let expectedPassword = "admin@N57.net";

        el.querySelector('#username').value = expectedUsername;
        el.querySelector('#username').dispatchEvent(new Event('input'));
        el.querySelector('#password').value = expectedPassword;
        el.querySelector('#password').dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(component.loginData).toEqual({
            userName: expectedUsername,
            password: expectedPassword
        });

        el.querySelector('#login').click();

        expect(component.submitted).toBeTruthy();
    });


    it('should have a link to the register page', () => {
        fixture.detectChanges();

        expect(links.length).toBe(1, 'should have 1 link');
        expect(links[0].linkParams).toBe('/register', 'link to register page');
    })

    it('should navigate to the register page on click', () => {
        const registerLinkDe = linkDes[0];
        const registerLink = links[0];

        expect(registerLink.navigatedTo).toBeNull('link should not have navigated yet');

        el.querySelector('#register').click();
        fixture.detectChanges();

        expect(registerLink.navigatedTo).toBe('/register');
    })
});
