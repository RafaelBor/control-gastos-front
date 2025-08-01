import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enums/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router      = inject(Router);

  console.log({route, state})
  console.log(authService.authStatus())
  if(authService.authStatus() === AuthStatus.authenticated){
    return true;
  }

  if(authService.authStatus() === AuthStatus.cheking){
    return false
  }

  router.navigateByUrl('/auth/login')
  return false;
};
