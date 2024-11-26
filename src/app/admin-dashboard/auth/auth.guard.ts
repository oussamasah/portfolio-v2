import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url)

    if (this.AuthService.isAuthenticated()) {
      return true;
    } else {
      console.warn('Access denied. Redirecting to login.');
      this.router.navigate(['admin/login']);

      return false;
    }
  }
}

