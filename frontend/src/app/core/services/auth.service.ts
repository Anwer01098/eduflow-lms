import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post('/auth/login', payload).pipe(
      tap((r: any) => {
        localStorage.setItem('token', r.accessToken);
        localStorage.setItem('refreshToken', r.refreshToken);
        localStorage.setItem('role', r.role);
        localStorage.setItem('status', r.status);
      })
    );
  }

  register(payload: any): Observable<any> {
    return this.http.post('/auth/register', payload);
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post('/auth/logout', { refreshToken }).subscribe({ error: () => {} });
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('status');
  }

  token() { return localStorage.getItem('token'); }
  isAuthenticated() { return !!this.token(); }
  role() { return localStorage.getItem('role') || 'STUDENT'; }
  status() { return localStorage.getItem('status') || 'ACTIVE'; }
}
