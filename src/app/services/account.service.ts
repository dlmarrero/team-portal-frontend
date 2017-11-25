import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from "../services/message.service";
import { AuthData } from '../models/login-data.model';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private apiUrl = environment.apiUrl;

  public authData: AuthData = {
    isAuth: false,
    userName: ""
  };

  /////////////////// LOGIN //////////////////

  login(loginData) {

    let data = "grant_type=password&username=" + encodeURIComponent(loginData.userName) + "&password=" + encodeURIComponent(loginData.password);

    return this.http.post(this.apiUrl + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .subscribe(data => {
        try {
          localStorage.setItem('jwt', data['access_token']);
          this.authData.isAuth = true;
          this.authData.userName = loginData.userName;
        } catch (error) {
          this.log(error);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        
        this.authData.isAuth = false;
        this.authData.userName = "";
      });
    // .pipe(
    //   tap(_ => this.log('Log in successful')),
    //   catchError(this.handleError<any>('login'))
    //   );
  };

  /////////////////// REGISTER //////////////////////

  /** POST:  register a new user */
  // Create a registration model to use here
  register(registration): Observable<any> {

    if (!registration) { return; }

    return this.http.post(this.apiUrl + '/api/account/register', registration, httpOptions)
      .pipe(
      tap(_ => this.log('Registration successful!  Logging you in...')),
      catchError(this.handleError<any>('saveRegistration'))
      );
  };

  ///////////// HELPER FUNCTIONS ////////////////

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}