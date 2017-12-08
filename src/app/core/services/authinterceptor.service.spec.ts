import { TestBed, inject } from '@angular/core/testing';

import { AuthInterceptor } from './authinterceptor.service';

describe('AuthinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });
  });

  it('should be created', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
