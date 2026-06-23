import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-white font-bold text-xl">ES</span>
          </div>
          <h1 class="text-2xl font-display font-bold text-gray-900">Join ESIC STEM LAB</h1>
          <p class="text-gray-500 text-sm mt-1">Create your free account</p>
        </div>
        <div class="esic-card p-8">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">First Name</label>
                <input [(ngModel)]="form.firstName" type="text" placeholder="John"
                  class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Last Name</label>
                <input [(ngModel)]="form.lastName" type="text" placeholder="Doe"
                  class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input [(ngModel)]="form.email" type="email" placeholder="you@example.com"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <input [(ngModel)]="form.password" type="password" placeholder="Min. 8 characters"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
            </div>
            @if (error()) { <p class="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{{ error() }}</p> }
            <button (click)="register()" [disabled]="loading()"
              class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm mt-2">
              {{ loading() ? 'Creating account...' : 'Create Account' }}
            </button>
          </div>
          <p class="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <a routerLink="/auth/login" class="text-primary-600 font-semibold hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  form = { firstName: '', lastName: '', email: '', password: '' };
  loading = signal(false);
  error = signal('');

  register() {
    const { firstName, lastName, email, password } = this.form;
    if (!firstName || !lastName || !email || !password) { this.error.set('All fields are required.'); return; }
    if (password.length < 8) { this.error.set('Password must be at least 8 characters.'); return; }
    this.loading.set(true); this.error.set('');
    this.auth.register(this.form).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => { this.error.set(e.error?.message ?? 'Registration failed'); this.loading.set(false); },
    });
  }
}