import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Stock } from '../_models/stock';

// TEMPORARY FIX: Hardcode the production URL to ensure it works
const baseUrl = 'https://backdep.onrender.com/api/stocks';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(baseUrl);
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
