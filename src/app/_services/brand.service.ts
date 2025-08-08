import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../_models/brand';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/brands`;

@Injectable({ providedIn: 'root' })
export class BrandService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${baseUrl}/public`);
  }

  getById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${baseUrl}/${id}`);
  }

  create(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(baseUrl, brand);
  }

  update(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${baseUrl}/${id}`, brand);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
}
