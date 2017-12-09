import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MessageService } from '../messages/message.service';
import { environment } from '@env/environment';
import { AuthData } from '@app/shared';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { this.getAuthData() }

  private apiUrl = environment.apiUrl;

  private _authData: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>({
    isAuth: false,
    userName: undefined
  });
  public authData: Observable<AuthData> = this._authData.asObservable();

  getAuthData(): void {
    // Check if user has a token in local storage
    let currentUser = localStorage.getItem('currentUser');

    // If so, initialize authData
    if (currentUser) {  // TODO:  make sure this behaves as expected if !currentUser
      this.auth(currentUser);
    }
  }

  login(loginData) {

    let data = "grant_type=password&username=" + encodeURIComponent(loginData.userName) + "&password=" + encodeURIComponent(loginData.password);

    return this.http.post(this.apiUrl + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .subscribe(data => {
        try {
          this.log('Login Successful...', true)
          localStorage.setItem('jwt', data['access_token']);
          localStorage.setItem('currentUser', loginData.userName);
          this.auth(loginData.userName);
          this.router.navigate(['/dashboard']);
          this.messageService.clear();
        } catch (error) {
          console.log(`Local storage error: ${error}`);
        }
      }, (err: HttpErrorResponse) => {
        this.log(err.error.error_description, false);
        this.deauth();
      });
  };


  logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');

    this.deauth();

    this.router.navigate(['./login']);
  }


  /** POST:  register a new user */
  register(registration): Observable<any> {
    return this.http.post(this.apiUrl + '/api/account/register', registration);
    // .subscribe(data => {
    //   this.log('Regisration successful!  Logging you in...', true)
    // }, err => {
    //   this.log(err.error.error_description, false)
    // })
  };


  private auth(userName) {
    this._authData.next({
      isAuth: true,
      userName: userName
    });
  }

  private deauth() {
    this._authData.next({
      isAuth: false,
      userName: undefined
    });
  }

  /** Log an error message with the MessageService */
  private log(message: string, success: boolean) {
    this.messageService.add(message, success);
  }
}