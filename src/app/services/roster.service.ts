import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'app/services/message.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthData } from 'app/models/login-data.model';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RosterService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private apiUrl = environment.apiUrl;

  getUsers(): Observable<any> {
      return this.http.get(this.apiUrl + '/api/Account/users')
  }

}
