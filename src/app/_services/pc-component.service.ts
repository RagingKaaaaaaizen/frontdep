import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { PCComponent } from '../_models/pc-component';

const baseUrl = `${environment.apiUrl}/api/pc-components`;

@Injectable({ providedIn: 'root' })
export class PCComponentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<PCComponent[]> {
    return this.http.get<PCComponent[]>(baseUrl);
  }

  getById(id: number | string): Observable<PCComponent> {
    return this.http.get<PCComponent>(`${baseUrl}/${id}`);
  }

  getByPCId(pcId: number | string): Observable<PCComponent[]> {
    return this.http.get<PCComponent[]>(`${baseUrl}/pc/${pcId}`);
  }

  getByItemId(itemId: number | string): Observable<PCComponent[]> {
    return this.http.get<PCComponent[]>(`${baseUrl}/item/${itemId}`);
  }

  create(component: PCComponent): Observable<PCComponent> {
    return this.http.post<PCComponent>(baseUrl, component);
  }

  update(id: number | string, component: Partial<PCComponent>): Observable<PCComponent> {
    return this.http.put<PCComponent>(`${baseUrl}/${id}`, component);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }

  returnToStock(id: number | string): Observable<void> {
    return this.http.post<void>(`${baseUrl}/${id}/return-to-stock`, {});
  }
} 