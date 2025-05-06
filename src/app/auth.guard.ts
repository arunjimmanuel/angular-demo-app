import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppConstants } from './shared/constants';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem(AppConstants.TOKEN_KEY);
    if (token) {
        return true;
    } else {
        return router.createUrlTree(['/login']);
    }
};
