import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/departments';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(baseUrl); }
}