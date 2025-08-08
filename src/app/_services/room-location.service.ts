import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/room-locations';

@Injectable({ providedIn: 'root' })
export class RoomLocationService {
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(baseUrl); }
} 