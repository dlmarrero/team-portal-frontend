import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = "Bearer " + localStorage.getItem('jwt');
    // Clone the request to add the new header.
    const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}