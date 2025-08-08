import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Dispose } from '../_models/dispose';

export interface DisposalValidation {
  valid: boolean;
  availableStock: number;
  totalStock?: number;
  usedInPCComponents?: number;
  message?: string;
}

const baseUrl = `${environment.apiUrl}/api/dispose`;

@Injectable({ providedIn: 'root' })
export class DisposeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Dispose[]> {
    return this.http.get<Dispose[]>(baseUrl);
  }

  getById(id: number | string): Observable<Dispose> {
    return this.http.get<Dispose>(`${baseUrl}/${id}`);
  }

  create(dispose: Dispose): Observable<Dispose> {
    return this.http.post<Dispose>(baseUrl, dispose);
  }

  update(id: number | string, dispose: Dispose): Observable<Dispose> {
    return this.http.put<Dispose>(`${baseUrl}/${id}`, dispose);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }

  getByItemId(itemId: number | string): Observable<Dispose[]> {
    return this.http.get<Dispose[]>(`${baseUrl}/item/${itemId}`);
  }

  validateDisposal(itemId: number | string, quantity: number): Observable<DisposalValidation> {
    return this.http.post<DisposalValidation>(`${baseUrl}/validate`, { itemId, quantity });
  }

  getDisposalWithStock(disposalId: number | string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${disposalId}/with-stock`);
  }

  getStockWithDisposal(itemId: number | string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/stock-with-disposal/${itemId}`);
  }
} 