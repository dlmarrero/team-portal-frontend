import { TestBed, inject } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { AuthService } from 'app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'app/core/services/message.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [UserDataService, AuthService, MessageService]
    });
  });

  it('should be created', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));
});
