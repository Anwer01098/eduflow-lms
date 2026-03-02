import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin-api.service';

@Component({
  template: `
    <div class="page-header"><h1>User Management</h1></div>
    <div *ngIf="message" class="alert alert-success">{{ message }}</div>
    <table *ngIf="users.length > 0">
      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let u of users">
          <td><strong>{{ u.fullName }}</strong></td>
          <td>{{ u.email }}</td>
          <td><span class="badge" [ngClass]="{'badge-blue': u.role==='ADMIN', 'badge-green': u.role==='TEACHER', 'badge-gray': u.role==='STUDENT'}">{{ u.role }}</span></td>
          <td><span class="badge" [ngClass]="{'badge-green': u.status==='ACTIVE', 'badge-yellow': u.status==='PENDING', 'badge-red': u.status==='BLOCKED' || u.status==='DENIED'}">{{ u.status }}</span></td>
          <td>{{ u.createdAt | date:'short' }}</td>
          <td>
            <button *ngIf="u.role==='TEACHER' && u.status==='ACTIVE'" class="btn btn-sm btn-danger" (click)="block(u.id)">Block</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  message = '';

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }
  load() { this.api.users().subscribe(u => this.users = u); }

  block(profileId: number) {
    this.api.blockTeacher(profileId, 'Blocked by admin').subscribe({
      next: () => { this.message = 'Teacher blocked.'; this.load(); }
    });
  }
}
