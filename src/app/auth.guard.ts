import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (_route, _state) => {
    const authService = inject(AuthService);
    if (authService.isLogged()) {
        return true;
    }
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
};
