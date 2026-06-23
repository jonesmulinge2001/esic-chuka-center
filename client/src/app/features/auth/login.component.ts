import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-xl">ES</span>
          </div>
          <h1 class="text-2xl font-display font-bold text-gray-900">Welcome back</h1>
          <p class="text-gray-500 text-sm mt-1">Sign in to your ESIC account</p>
        </div>
        <div class="esic-card p-8">
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input [(ngModel)]="email" type="email" placeholder="you@example.com"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <input [(ngModel)]="password" type="password" placeholder="••••••••"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                (keydown.enter)="login()">
            </div>
            @if (error()) { <p class="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{{ error() }}</p> }
            <button (click)="login()" [disabled]="loading()"
              class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm mt-2">
              {{ loading() ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
          <p class="text-center text-sm text-gray-500 mt-6">
            Don't have an account?
            <a routerLink="/auth/register" class="text-primary-600 font-semibold hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = ''; password = '';
  loading = signal(false);
  error = signal('');

  login() {
    if (!this.email || !this.password) { this.error.set('Please enter email and password.'); return; }
    this.loading.set(true); this.error.set('');
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => { this.error.set(e.error?.message ?? 'Invalid credentials'); this.loading.set(false); },
    });
  }
}