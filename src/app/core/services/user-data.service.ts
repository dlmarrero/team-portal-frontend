import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { AuthData, User } from '@app/shared';
import { environment } from '@env/environment';


@Injectable()
export class UserDataService {
  private apiUrl = environment.apiUrl

  private _userData: BehaviorSubject<any> = new BehaviorSubject<any>(null); // TODO:  get user class, apply all over
  public userData: Observable<any> = this._userData.asObservable();



  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.authService.authData.subscribe((authData: AuthData) => {
      if (authData.isAuth) { this.getCurrentUserData(authData.userName) };
    });
  }

  // TODO:  use guid for this api endpoint instead
  /** GET userData from server */
  private getCurrentUserData(userName): Observable<any> {
    let obs = this.http.get(this.apiUrl + '/api/account?username=' + userName);
    obs.subscribe((data: User) => {
      this._userData.next(data);
    });
    return obs;
  }
}