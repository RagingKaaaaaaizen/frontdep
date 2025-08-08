import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiTestService {
  constructor(private http: HttpClient) {}

  // Test different API URL structures
  testApiConnection(): Observable<any> {
    const testUrls = [
      environment.apiUrl,
      environment.apiUrlAlt1,
      environment.apiUrlAlt2
    ];

    const results: any[] = [];

    testUrls.forEach((url, index) => {
      this.testEndpoint(url).subscribe(
        (result) => {
          results[index] = { url, status: 'success', result };
          console.log(`✅ API test ${index + 1} (${url}): SUCCESS`, result);
        },
        (error) => {
          results[index] = { url, status: 'error', error: error.message };
          console.log(`❌ API test ${index + 1} (${url}): FAILED`, error);
        }
      );
    });

    return of(results);
  }

  // Test specific endpoints
  testEndpoint(baseUrl: string): Observable<any> {
    const testEndpoints = [
      '/accounts/register',
      '/accounts/authenticate',
      '/stocks/public',
      '/items/public',
      '/categories/public'
    ];

    const results: any[] = [];

    testEndpoints.forEach((endpoint) => {
      this.http.get(`${baseUrl}${endpoint}`).pipe(
        catchError(error => {
          console.log(`❌ Endpoint test failed: ${baseUrl}${endpoint}`, error);
          return of({ error: error.message });
        })
      ).subscribe(result => {
        results.push({ endpoint, result });
      });
    });

    return of(results);
  }

  // Test if backend is reachable
  testBackendHealth(): Observable<any> {
    const healthUrls = [
      `${environment.apiUrl}/health`,
      `${environment.apiUrl}/api/health`,
      `${environment.apiUrl}/v1/health`,
      `${environment.apiUrl}/status`
    ];

    return this.http.get(healthUrls[0]).pipe(
      catchError(error => {
        console.log('Backend health check failed:', error);
        return of({ error: error.message });
      })
    );
  }

  // Get the best working API URL
  getWorkingApiUrl(): Observable<string> {
    return this.testApiConnection().pipe(
      map(results => {
        const workingResult = results.find(r => r.status === 'success');
        return workingResult ? workingResult.url : environment.apiUrl;
      })
    );
  }
}
