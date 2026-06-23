import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow">
              <span class="text-white font-bold text-sm">ES</span>
            </div>
            <div class="hidden sm:block">
              <div class="font-display font-bold text-gray-900 text-sm leading-tight">ESIC STEM LAB</div>
              <div class="text-xs text-gray-500">Chuka University</div>
            </div>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            @for (link of navLinks; track link.path) {
              <a [routerLink]="link.path" routerLinkActive="text-primary-600 bg-primary-50"
                 class="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                {{ link.label }}
              </a>
            }
          </div>

          <!-- Auth Actions -->
          <div class="flex items-center gap-3">
            @if (auth.isAuthenticated()) {
              <a routerLink="/dashboard" class="text-sm text-gray-600 hover:text-primary-600 font-medium hidden sm:block">
                {{ auth.user()?.firstName }}
              </a>
              @if (auth.isAdmin()) {
                <a routerLink="/admin" class="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold hidden sm:block">
                  Admin
                </a>
              }
              <button (click)="auth.logout()"
                class="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">
                Logout
              </button>
            } @else {
              <a routerLink="/auth/login" class="text-sm font-medium text-gray-600 hover:text-primary-600">Login</a>
              <a routerLink="/auth/register"
                class="bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Join ESIC
              </a>
            }

            <!-- Mobile menu toggle -->
            <button (click)="menuOpen.set(!menuOpen())" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <span class="material-icons-outlined text-gray-600">{{ menuOpen() ? 'close' : 'menu' }}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Nav -->
        @if (menuOpen()) {
          <div class="md:hidden border-t border-gray-100 py-3 pb-4 flex flex-col gap-1">
            @for (link of navLinks; track link.path) {
              <a [routerLink]="link.path" (click)="menuOpen.set(false)"
                 routerLinkActive="text-primary-600 bg-primary-50"
                 class="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                {{ link.label }}
              </a>
            }
          </div>
        }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  auth = inject(AuthService);
  menuOpen = signal(false);

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/projects', label: 'Projects' },
    { path: '/events', label: 'Events' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];
}