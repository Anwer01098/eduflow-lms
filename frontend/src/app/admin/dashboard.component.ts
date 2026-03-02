import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin-api.service';

@Component({
  template: `
    <div class="page-header"><h1>Admin Dashboard</h1></div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-value">{{ users.length }}</div><div class="stat-label">Total Users</div></div>
      <div class="stat-card"><div class="stat-value">{{ pendingCount }}</div><div class="stat-label">Pending Approvals</div></div>
      <div class="stat-card"><div class="stat-value">{{ courses.length }}</div><div class="stat-label">Total Courses</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <h2>Quick Links</h2>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a routerLink="/admin/approvals" class="btn btn-outline">Manage Approvals</a>
          <a routerLink="/admin/users" class="btn btn-outline">Manage Users</a>
          <a routerLink="/admin/courses" class="btn btn-outline">Manage Courses</a>
        </div>
      </div>
      <div class="card">
        <h2>Pending Approvals</h2>
        <div *ngIf="pendingCount === 0" class="empty-state" style="padding: 24px;"><p>No pending approvals</p></div>
        <div *ngFor="let a of approvals" style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
          <strong>{{ a.fullName }}</strong>
          <span style="color: #6b7280; font-size: 13px;"> &middot; {{ a.email }}</span>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  courses: any[] = [];
  approvals: any[] = [];
  get pendingCount() { return this.approvals.length; }

  constructor(private api: AdminApiService) {}

  ngOnInit() {
    this.api.users().subscribe(u => this.users = u);
    this.api.courses().subscribe(c => this.courses = c);
    this.api.approvals().subscribe(a => this.approvals = a);
  }
}
