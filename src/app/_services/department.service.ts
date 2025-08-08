import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/departments`;

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> { return this.http.get<any[]>(`${environment.apiUrl}/departments`); }

  getById(id: number | string): Observable<any> { return this.http.get<any>(`${environment.apiUrl}/departments/${id}`); }

  create(dept: any): Observable<any> { return this.http.post<any>(`${environment.apiUrl}/departments`, dept); }

  update(id: number | string, dept: any): Observable<any> { return this.http.put<any>(`${environment.apiUrl}/departments/${id}`, dept); }

  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/departments/${id}`); }
}