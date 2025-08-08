import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { PC, SpecificationField } from '../_models/pc';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class PcService {
    constructor(private http: HttpClient) {}
    getAll(): Observable<any[]> { return this.http.get<any[]>(`${environment.apiUrl}/api/pcs`); }

    getById(id: number | string): Observable<any> { return this.http.get<any>(`${environment.apiUrl}/api/pcs/${id}`); }

    create(pc: any): Observable<any> { return this.http.post<any>(`${environment.apiUrl}/api/pcs`, pc); }

    update(id: number | string, pc: any): Observable<any> { return this.http.put<any>(`${environment.apiUrl}/api/pcs/${id}`, pc); }

    delete(id: number | string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/api/pcs/${id}`); }
} 