import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usertoken = localStorage.getItem('token');
    const modifiedReq = request.clone(
      {
        headers: request.headers.set('token', `${usertoken}`)
      }
    )
    return next.handle(modifiedReq);
  }
}
