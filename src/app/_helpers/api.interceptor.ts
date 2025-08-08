import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiUrls = [
    environment.apiUrl,
    environment.apiUrlAlt1,
    environment.apiUrlAlt2
  ];

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log API requests in debug mode
    if (environment.debugApi) {
      console.log(`🌐 API Request: ${request.method} ${request.url}`);
    }

    // Add common headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (environment.debugApi) {
          console.error(`❌ API Error: ${request.method} ${request.url}`, error);
        }

        // Handle specific error cases
        if (error.status === 404) {
          console.warn(`⚠️ 404 Not Found: ${request.url}`);
          console.warn('This might indicate an incorrect API endpoint or URL structure');
        }

        if (error.status === 0) {
          console.error('🚫 Network Error: Unable to connect to the backend');
          console.error('Please check if the backend is running and accessible');
        }

        if (error.status === 403) {
          console.error('🚫 Forbidden: Access denied to the API endpoint');
        }

        if (error.status === 500) {
          console.error('💥 Server Error: Backend encountered an internal error');
        }

        return throwError(() => error);
      })
    );
  }
}
