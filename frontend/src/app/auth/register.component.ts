import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  template: `
    <div style="max-width: 420px; margin: 40px auto;">
      <div class="card">
        <h2 style="text-align: center; margin-bottom: 24px;">Create Account</h2>
        <div *ngIf="error" class="alert alert-error">{{ error }}</div>
        <div *ngIf="success" class="alert alert-success">{{ success }}</div>
        <form [formGroup]="f" (ngSubmit)="submit()">
          <div class="form-group">
            <label>Full Name</label>
            <input formControlName="fullName" placeholder="John Doe">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input formControlName="email" type="email" placeholder="you@example.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input formControlName="password" type="password" placeholder="Min 8 characters">
          </div>
          <div class="form-group">
            <label>Role</label>
            <select formControlName="role">
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          <button class="btn btn-primary" style="width: 100%;" [disabled]="loading">
            {{ loading ? 'Creating...' : 'Create Account' }}
          </button>
        </form>
        <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #6b7280;">
          Already have an account? <a routerLink="/auth/login">Sign In</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  f = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['STUDENT']
  });
  error = '';
  success = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.auth.register(this.f.value).subscribe({
      next: () => {
        this.success = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (e) => {
        this.error = e.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
