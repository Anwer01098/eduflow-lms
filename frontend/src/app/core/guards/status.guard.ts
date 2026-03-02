import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StatusGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const status = localStorage.getItem('status');
    if (status === 'PENDING' || status === 'BLOCKED') {
      this.router.navigate(['/teacher/pending']);
      return false;
    }
    return true;
  }
}
