import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AuthData } from 'app/models/login-data.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Todo } from 'app/components/app-aside/todo/todo.model';
import { TodoService } from 'app/components/app-aside/todo/todo.service';
import { User } from 'app/core/types/user';

@Injectable()
export class UserDataService {
  private apiUrl = environment.apiUrl
  
  private _userData: BehaviorSubject<any> = new BehaviorSubject<any>(null); // TODO:  get user class, apply all over
  public userData: Observable<any> = this._userData.asObservable();

  

  constructor(
    private authService: AuthService,
    // private todoService: TodoService,
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
      // this.todoService.getToDos(data.id)
    });
    return obs;
  }
}