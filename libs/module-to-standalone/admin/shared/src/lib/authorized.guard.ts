import { CanActivateFn, Router } from '@angular/router';

import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const isAuthorizedGuard: CanActivateFn = () => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  return authorizationService.isAuthorized$.pipe(
    map((isAuthorized) => {
      return isAuthorized ? true : router.createUrlTree(['forbidden']);
    }),
  );
};
