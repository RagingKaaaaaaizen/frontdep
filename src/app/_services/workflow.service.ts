import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

// import { environment } from '@environments/environment';
import { Workflow } from '@app/_models/workflow';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
    constructor(private http: HttpClient) {}
    getAll(): Observable<Workflow[]> { return this.http.get<Workflow[]>(`${environment.apiUrl}/workflows`); }

    getById(id: number | string): Observable<Workflow> { return this.http.get<Workflow>(`${environment.apiUrl}/workflows/${id}`); }

    getByEmployeeId(employeeId: number | string): Observable<Workflow[]> { return this.http.get<Workflow[]>(`${environment.apiUrl}/workflows/employee/${employeeId}`); }

    create(workflow: Partial<Workflow>): Observable<Workflow> { return this.http.post<Workflow>(`${environment.apiUrl}/workflows`, workflow); }

    update(id: number | string, workflow: Partial<Workflow>): Observable<Workflow> { return this.http.put<Workflow>(`${environment.apiUrl}/workflows/${id}`, workflow); }

    delete(id: number | string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/workflows/${id}`); }
} 