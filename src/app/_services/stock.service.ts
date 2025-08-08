import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Stock } from '../_models/stock';

const baseUrl = `${environment.apiUrl}/api/stocks`;

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${baseUrl}/public`);
  }

  getById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${baseUrl}/${id}`);
  }

  create(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(baseUrl, stock);
  }

  update(id: number, stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${baseUrl}/${id}`, stock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }

  getAvailableStock(itemId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/available/${itemId}`);
  }
}
