import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('role');
    if (route.data['roles']?.includes(role)) return true;
    this.router.navigate(['/']);
    return false;
  }
}
