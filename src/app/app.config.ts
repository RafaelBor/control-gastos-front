import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { LoaderInterceptor } from './commons/interceptors/loader.interceptor';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './commons/utils/date_formats';
import { authInterceptor } from './commons/interceptors/auth.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environments';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
    ...(environment.production ? [provideServiceWorker('ngsw-worker.js')] : []),
    importProvidersFrom(
      MatNativeDateModule
    ),

    
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }, // Cambia la localización
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },

  ],
   
};
