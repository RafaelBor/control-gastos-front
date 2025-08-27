import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';



@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly loaderService: LoaderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    // Procesar la petición y luego ocultar el loader
    return next.handle(req).pipe(
      delay(500),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}