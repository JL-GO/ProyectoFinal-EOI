import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppAutentificacionServiceService } from '../autentificacion/app-autentificacion.service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptorServiceService  implements HttpInterceptor{

  constructor(private auth:AppAutentificacionServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  

    let reqNew = req.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.token.token}`
      }
    });
    return next.handle(reqNew);
  }
}