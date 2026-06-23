import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Sidebar -->
      <aside class="w-60 bg-gray-900 text-gray-300 min-h-screen p-5 flex flex-col">
        <div class="mb-8">
          <div class="text-white font-display font-bold text-sm">ESIC Admin</div>
          <div class="text-gray-500 text-xs mt-0.5">Dashboard</div>
        </div>
        <nav class="space-y-1 flex-1">
          @for (item of navItems; track item.label) {
            <a [routerLink]="item.route" routerLinkActive="bg-primary-600 text-white"
               class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-800 hover:text-white transition-colors">
              <span class="material-icons-outlined text-base">{{ item.icon }}</span>{{ item.label }}
            </a>
          }
        </nav>
        <a routerLink="/" class="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 mt-4">
          <span class="material-icons-outlined text-sm">arrow_back</span> Back to site
        </a>
      </aside>

      <!-- Content -->
      <main class="flex-1 p-8">
        <h1 class="font-display font-bold text-gray-900 text-2xl mb-8">Admin Dashboard</h1>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          @for (stat of stats; track stat.label) {
            <div class="esic-card p-5">
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-2xl font-display font-bold text-gray-900">—</div>
                  <div class="text-sm text-gray-500 mt-1">{{ stat.label }}</div>
                </div>
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" [style.background]="stat.bg">
                  <span class="material-icons-outlined text-base" [style.color]="stat.color">{{ stat.icon }}</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          @for (item of quickActions; track item.label) {
            <a [routerLink]="item.route" class="esic-card p-6 hover:shadow-md hover:border-primary-200 transition-all group flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <span class="material-icons-outlined text-primary-600">{{ item.icon }}</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{{ item.label }}</div>
                <div class="text-sm text-gray-500">{{ item.desc }}</div>
              </div>
            </a>
          }
        </div>
      </main>
    </div>
  `,
})
export class AdminDashboardComponent {
  navItems = [
    { label: 'Overview', route: '/admin', icon: 'dashboard' },
    { label: 'Submissions', route: '/admin/submissions', icon: 'science' },
    { label: 'Events', route: '/admin/events', icon: 'event' },
    { label: 'Users', route: '/admin/users', icon: 'people' },
    { label: 'Contact', route: '/admin/contact', icon: 'mail' },
  ];

  stats = [
    { label: 'Total Users', icon: 'people', bg: '#dbeafe', color: '#2563eb' },
    { label: 'Events', icon: 'event', bg: '#d1fae5', color: '#059669' },
    { label: 'Projects', icon: 'science', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Messages', icon: 'mail', bg: '#fef3c7', color: '#d97706' },
  ];

  quickActions = [
    { label: 'Review Submissions', desc: 'Approve or reject project submissions', route: '/admin/submissions', icon: 'rate_review' },
    { label: 'Manage Events', desc: 'Create and manage events', route: '/admin/events', icon: 'event_note' },
    { label: 'User Management', desc: 'View and manage registered users', route: '/admin/users', icon: 'manage_accounts' },
    { label: 'Contact Messages', desc: 'View and respond to inquiries', route: '/admin/contact', icon: 'inbox' },
  ];
}