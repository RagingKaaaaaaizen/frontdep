import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';
import { StorageLocation } from '../_models/storagelocation';

@Injectable({ providedIn: 'root' })
export class StorageLocationService {
  private baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/storage-locations';
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(this.baseUrl); }
}
