import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  template: `
    <div style="max-width: 420px; margin: 40px auto;">
      <div class="card">
        <h2 style="text-align: center; margin-bottom: 24px;">Welcome Back</h2>
        <div *ngIf="error" class="alert alert-error">{{ error }}</div>
        <form [formGroup]="f" (ngSubmit)="submit()">
          <div class="form-group">
            <label>Email</label>
            <input formControlName="email" type="email" placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input formControlName="password" type="password" placeholder="Enter your password">
          </div>
          <button class="btn btn-primary" style="width: 100%;" [disabled]="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #6b7280;">
          Don't have an account? <a routerLink="/auth/register">Register</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  f = this.fb.group({ email: ['', Validators.required], password: ['', Validators.required] });
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.f.value).subscribe({
      next: (r: any) => {
        this.router.navigate(['/' + r.role.toLowerCase()]);
      },
      error: (e) => {
        this.error = e.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
