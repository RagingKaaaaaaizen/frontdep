import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/api/room-locations`;

@Injectable({ providedIn: 'root' })
export class RoomLocationService {
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<any[]> { 
    return this.http.get<any[]>(`${environment.apiUrl}/api/room-locations/public`); 
  }

  getById(id: number | string): Observable<any> { 
    return this.http.get<any>(`${environment.apiUrl}/api/room-locations/${id}`); 
  }

  create(location: any): Observable<any> { 
    return this.http.post<any>(`${environment.apiUrl}/api/room-locations`, location); 
  }

  update(id: number | string, location: any): Observable<any> { 
    return this.http.put<any>(`${environment.apiUrl}/api/room-locations/${id}`, location); 
  }

  delete(id: number | string): Observable<void> { 
    return this.http.delete<void>(`${environment.apiUrl}/api/room-locations/${id}`); 
  }
} 