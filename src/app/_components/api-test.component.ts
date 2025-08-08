import { Component, OnInit } from '@angular/core';
import { ApiTestService } from '@app/_services/api-test.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-api-test',
  template: `
    <div class="api-test-container">
      <h3>API Connection Test</h3>
      <div class="test-results">
        <div *ngFor="let result of testResults" class="test-result">
          <div [class]="result.status === 'success' ? 'success' : 'error'">
            <strong>{{ result.url }}</strong>
            <span>{{ result.status === 'success' ? '✅ SUCCESS' : '❌ FAILED' }}</span>
          </div>
          <div *ngIf="result.error" class="error-details">
            Error: {{ result.error }}
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button (click)="runTests()" class="btn btn-primary">Run API Tests</button>
        <button (click)="testHealth()" class="btn btn-secondary">Test Backend Health</button>
      </div>
      
      <div *ngIf="healthResult" class="health-result">
        <h4>Backend Health Check:</h4>
        <pre>{{ healthResult | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .api-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .test-results {
      margin: 20px 0;
    }
    
    .test-result {
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    
    .success {
      color: green;
    }
    
    .error {
      color: red;
    }
    
    .error-details {
      margin-top: 5px;
      font-size: 0.9em;
      color: #666;
    }
    
    .actions {
      margin: 20px 0;
    }
    
    .btn {
      margin-right: 10px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .health-result {
      margin-top: 20px;
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 5px;
    }
    
    pre {
      background-color: #f1f1f1;
      padding: 10px;
      border-radius: 3px;
      overflow-x: auto;
    }
  `]
})
export class ApiTestComponent implements OnInit {
  testResults: any[] = [];
  healthResult: any = null;

  constructor(private apiTestService: ApiTestService) {}

  ngOnInit() {
    console.log('Current API URL:', environment.apiUrl);
    console.log('Alternative API URLs:', {
      alt1: environment.apiUrlAlt1,
      alt2: environment.apiUrlAlt2
    });
  }

  runTests() {
    this.testResults = [];
    this.apiTestService.testApiConnection().subscribe(results => {
      this.testResults = results;
      console.log('API Test Results:', results);
    });
  }

  testHealth() {
    this.apiTestService.testBackendHealth().subscribe(result => {
      this.healthResult = result;
      console.log('Health Check Result:', result);
    });
  }
}
