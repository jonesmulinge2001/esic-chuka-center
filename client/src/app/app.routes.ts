import { HomeComponent } from './features/home/home.component';
import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'programs', loadComponent: () => import('./features/programs/programs.component').then(m => m.ProgramsComponent) },
  { path: 'programs/early-stem', loadComponent: () => import('./features/programs/programs-early-stem.component').then(m => m.EarlyStemComponent) },
  { path: 'programs/junior-stem', loadComponent: () => import('./features/programs/programs-junior-stem.component').then(m => m.JuniorStemComponent) },
  { path: 'programs/advanced-stem', loadComponent: () => import('./features/programs/programs-advanced-engineering.component').then(m => m.AdvancedEngineeringComponent) },
  // { path: 'programs/:slug', loadComponent: () => import('./features/programs/program-detail.component').then(m => m.ProgramDetailComponent) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'projects/:slug', loadComponent: () => import('./features/projects/project-detail.component').then(m => m.ProjectDetailComponent) },
  { path: 'events', loadComponent: () => import('./features/events/events.component').then(m => m.EventsComponent) },
  { path: 'events/:slug', loadComponent: () => import('./features/events/event-detail.component').then(m => m.EventDetailComponent) },
  { path: 'resources', loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent) },
  { path: 'gallery', loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes),
  },
  { path: '**', redirectTo: '' },
];