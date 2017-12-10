import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'app/core/services/message.service';
import { UserDataService } from 'app/core/services/user-data.service';
import { AuthService } from 'app/core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [TodoService, MessageService, UserDataService, AuthService]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
