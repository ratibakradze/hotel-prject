import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthedGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.isUserAuth()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
