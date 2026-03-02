import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <a routerLink="/" class="logo">Edu<span>Flow</span></a>
      <div class="nav-links">
        <ng-container *ngIf="!auth.isAuthenticated()">
          <a routerLink="/auth/login">Login</a>
          <a routerLink="/auth/register">Register</a>
        </ng-container>
        <ng-container *ngIf="auth.isAuthenticated()">
          <a [routerLink]="'/' + auth.role().toLowerCase()">Dashboard</a>
          <a *ngIf="auth.role()==='STUDENT'" routerLink="/student/courses">Courses</a>
          <a *ngIf="auth.role()==='TEACHER'" routerLink="/teacher/courses">My Courses</a>
          <a *ngIf="auth.role()==='ADMIN'" routerLink="/admin/approvals">Approvals</a>
          <a *ngIf="auth.role()==='ADMIN'" routerLink="/admin/users">Users</a>
          <a href="javascript:void(0)" (click)="logout()">Logout</a>
        </ng-container>
      </div>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
