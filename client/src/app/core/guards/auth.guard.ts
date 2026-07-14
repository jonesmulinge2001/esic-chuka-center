import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/auth/login']);
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  // First check if user is authenticated
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }
  
  // Then check if user is admin
  if (auth.isAdmin()) {
    return true;
  }
  
  // User is authenticated but not admin
  return router.createUrlTree(['/']);
};