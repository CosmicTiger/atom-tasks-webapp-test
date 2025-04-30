import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userData$.pipe(
    map((user) => {
      if (user) return true;
      router.navigateByUrl('/login');
      return false;
    })
  );
};
