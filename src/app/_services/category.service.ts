import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> { return this.http.get<any[]>(`${environment.apiUrl}/categories/public`); }

  getById(id: number | string): Observable<any> { return this.http.get<any>(`${environment.apiUrl}/categories/${id}`); }

  create(category: any): Observable<any> { return this.http.post<any>(`${environment.apiUrl}/categories`, category); }

  update(id: number | string, category: any): Observable<any> { return this.http.put<any>(`${environment.apiUrl}/categories/${id}`, category); }

  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/categories/${id}`); }
}
