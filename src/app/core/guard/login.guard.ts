import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);

  if (loginService.loggedIn) {
    return true;
  }else{
    router.navigate(["/"])
    return false;
  }
};