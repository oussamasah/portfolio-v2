import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Functional Authorization Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return next(req); // Continue without modification if no token
  }

  // Add 'Bearer ' prefix to the token
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(clonedReq); // Continue with the new request
};

// Functional Error Interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Request esssssssssssrror:', error);

      if (error.status === 401) {
        // Remove the invalid token from localStorage
        localStorage.removeItem('auth_token');

        // Redirect to the login page
        window.location.replace('/admin/login');
      }

      return throwError(() => error);
    })
  );
};
