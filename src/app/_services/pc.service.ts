import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { PC, SpecificationField } from '../_models/pc';

@Injectable({ providedIn: 'root' })
export class PcService {
    private baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/pcs';
    constructor(private http: HttpClient) {}
    getAll() { return this.http.get<any[]>(this.baseUrl); }
} 