import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  { path: '', loadComponent: () => import('./admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'submissions', loadComponent: () => import('./admin-submissions.component').then(m => m.AdminSubmissionsComponent) },
  { path: 'events', loadComponent: () => import('./admin-events.component').then(m => m.AdminEventsComponent) },
  { path: 'users', loadComponent: () => import('./admin-users.component').then(m => m.AdminUsersComponent) },
  { path: 'contact', loadComponent: () => import('./admin-contact.component').then(m => m.AdminContactComponent) },
];