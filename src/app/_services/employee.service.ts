import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/employees';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<any[]>(baseUrl); }
}