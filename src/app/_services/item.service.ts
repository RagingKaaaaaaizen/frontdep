import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/items';
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(this.baseUrl); }
}
