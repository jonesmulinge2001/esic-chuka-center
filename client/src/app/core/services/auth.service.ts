import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'STAFF' | 'USER';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(this.loadUser());
  private _token = signal<string | null>(localStorage.getItem('esic_token'));

  user = this._user.asReadonly();
  token = this._token.asReadonly();
  isAuthenticated = computed(() => !!this._token());
  isAdmin = computed(() => this._user()?.role === 'ADMIN');
  isStaff = computed(() => ['ADMIN', 'STAFF'].includes(this._user()?.role ?? ''));

  constructor(private api: ApiService, private router: Router) {}

  login(email: string, password: string) {
    return this.api.post<{ accessToken: string; user: User }>('/auth/login', { email, password })
      .pipe(tap(res => this.setSession(res.accessToken, res.user)));
  }

  register(data: { email: string; password: string; firstName: string; lastName: string }) {
    return this.api.post<{ accessToken: string; user: User }>('/auth/register', data)
      .pipe(tap(res => this.setSession(res.accessToken, res.user)));
  }

  logout() {
    localStorage.removeItem('esic_token');
    localStorage.removeItem('esic_user');
    this._token.set(null);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  private setSession(token: string, user: User) {
    localStorage.setItem('esic_token', token);
    localStorage.setItem('esic_user', JSON.stringify(user));
    this._token.set(token);
    this._user.set(user);
  }

  private loadUser(): User | null {
    try {
      const u = localStorage.getItem('esic_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  }
}