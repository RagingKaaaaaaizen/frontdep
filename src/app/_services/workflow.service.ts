import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { Workflow } from '@app/_models/workflow';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
    private baseUrl = 'https://inventory-backend-api-production-030e.up.railway.app/api/workflows';
    constructor(private http: HttpClient) {}
    getAll() { return this.http.get<any[]>(this.baseUrl); }
} 