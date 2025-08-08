import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<any[]> { 
    return this.http.get<any[]>(`${environment.apiUrl}/items/public`); 
  }

  getById(id: number | string): Observable<any> { 
    return this.http.get<any>(`${environment.apiUrl}/items/${id}`); 
  }

  create(item: any): Observable<any> { 
    return this.http.post<any>(`${environment.apiUrl}/items`, item); 
  }

  update(id: number | string, item: any): Observable<any> { 
    return this.http.put<any>(`${environment.apiUrl}/items/${id}`, item); 
  }

  delete(id: number | string): Observable<void> { 
    return this.http.delete<void>(`${environment.apiUrl}/items/${id}`); 
  }
}
