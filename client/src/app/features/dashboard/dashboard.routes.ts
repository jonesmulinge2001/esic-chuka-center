import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  { path: '', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
  { path: 'submit-project', loadComponent: () => import('./submit-project.component').then(m => m.SubmitProjectComponent) },
  { path: 'my-events', loadComponent: () => import('./my-events.component').then(m => m.MyEventsComponent) },
];