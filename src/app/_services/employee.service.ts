import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/employees`;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any[]> { return this.http.get<any[]>(`${environment.apiUrl}/employees`); }

  getById(id: number | string): Observable<any> { return this.http.get<any>(`${environment.apiUrl}/employees/${id}`); }

  create(employee: any): Observable<any> { return this.http.post<any>(`${environment.apiUrl}/employees`, employee); }

  update(id: number | string, employee: any): Observable<any> { return this.http.put<any>(`${environment.apiUrl}/employees/${id}`, employee); }

  delete(id: number | string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/employees/${id}`); }

  transferDepartment(id: number | string, departmentId: number | string): Observable<any> { return this.http.post<any>(`${environment.apiUrl}/employees/${id}/transfer`, { departmentId }); }
}