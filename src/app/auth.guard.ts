import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

// noinspection JSUnusedLocalSymbols
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    if (authService.isLogged()) {
        return true;
    }
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
};
