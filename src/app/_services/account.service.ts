import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}/api/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account | null {
        return this.accountSubject.value;
    }

    private normalizeAccountResponse(resp: any): any {
        const payload = resp?.data ?? resp; // unwrap { data: ... } if present
        if (!payload) return resp;
        // Normalize token field name
        if (!payload.jwtToken) {
            if (payload.token) payload.jwtToken = payload.token;
            if (payload.accessToken) payload.jwtToken = payload.accessToken;
        }
        return payload;
    }

    login(email: string, password: string) {
        const payload: any = { email, password };
        // Add username for backends that expect username instead of email
        payload.username = email;
        return this.http.post<any>(`${baseUrl}/authenticate`, payload, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            map(resp => {
                const account = this.normalizeAccountResponse(resp);
                this.accountSubject.next(account);
                // Start refresh timer only if we have a JWT
                if (account?.jwtToken) {
                    this.startRefreshTokenTimer();
                }
                return account;
            })
        );
    }

    logout() {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe({ error: () => {} });
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((resp) => {
                const account = this.normalizeAccountResponse(resp);
                // Merge onto existing account (keep profile fields)
                const merged = { ...(this.accountSubject.value ?? {}), ...(account ?? {}) } as Account;
                this.accountSubject.next(merged);
                if (merged?.jwtToken) {
                    this.startRefreshTokenTimer();
                }
                return merged;
            }));
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }
    
    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }
    
    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }
    
    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<Account[]>(baseUrl).pipe(
            map((accounts: any[]) =>
                accounts.map(acc => ({
                    ...acc,
                    isActive: acc.status === 'Active'
                }))
            )
        );
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`)
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }
    
    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    // helper methods
    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        const current = this.accountValue;
        if (!current?.jwtToken) {
            return;
        }
        const jwtToken = JSON.parse(atob(current.jwtToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe({ error: () => {} }), Math.max(0, timeout));
    }

    private stopRefreshTokenTimer() {
        if (this.refreshTokenTimeout) {
            clearTimeout(this.refreshTokenTimeout);
            this.refreshTokenTimeout = null;
        }
    }
}