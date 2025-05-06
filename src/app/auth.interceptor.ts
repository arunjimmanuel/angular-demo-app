import { HttpInterceptorFn } from '@angular/common/http';
import { AppConstants } from './shared/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AppConstants.TOKEN_KEY);

  const excludedRoutes = ['/auth/login', '/auth/register'];

  const isExcluded = excludedRoutes.some(url => req.url.includes(url));

  if (token && !isExcluded) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
