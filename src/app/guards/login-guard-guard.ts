import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserSvc } from '../services/user-svc';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const userSvc = inject(UserSvc);
  const router = inject(Router);
  console.log('in guard');

  const token = userSvc.getToken();

  console.log('after this line');
  if (!token) {
    console.log('ok then');
    return router.createUrlTree(['/login']);
  }
  return true;
};
