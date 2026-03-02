import { Component } from '@angular/core';

@Component({
  template: `
    <div style="text-align: center; padding: 60px 20px;">
      <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 16px; color: #1f2937;">
        Learn smarter with <span style="color: #4361ee;">EduFlow</span>
      </h1>
      <p style="font-size: 18px; color: #6b7280; max-width: 600px; margin: 0 auto 32px;">
        A modern learning management system for students and teachers. Create courses, manage assignments, and track progress.
      </p>
      <div style="display: flex; gap: 16px; justify-content: center;">
        <a routerLink="/auth/register" class="btn btn-primary" style="font-size: 16px; padding: 14px 32px;">Get Started</a>
        <a routerLink="/auth/login" class="btn btn-outline" style="font-size: 16px; padding: 14px 32px;">Sign In</a>
      </div>
      <div class="stat-cards" style="margin-top: 60px;">
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">User Roles</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">JWT</div>
          <div class="stat-label">Authentication</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">RBAC</div>
          <div class="stat-label">Access Control</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">REST</div>
          <div class="stat-label">Spring Boot API</div>
        </div>
      </div>
    </div>
  `
})
export class LandingComponent {}
