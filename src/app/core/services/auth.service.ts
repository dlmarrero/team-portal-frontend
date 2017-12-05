import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from "app/core/services/message.service";
import { AuthData } from 'app/models/login-data.model';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

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

  ///////////// HELPER FUNCTIONS ////////////////

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

  // TODO:  nuke this... not being used.
  private errorHandler(err) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}, error message: ${err.error.error_description}`);
    }
  }

  // TODO:  nuke this... not being used.
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, false);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log an error message with the MessageService */
  private log(message: string, success: boolean) {
    this.messageService.add(message, success);
  }
}