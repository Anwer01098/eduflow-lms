import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin-api.service';

@Component({
  template: `
    <div class="page-header"><h1>Teacher Approvals</h1></div>
    <div *ngIf="message" class="alert alert-success">{{ message }}</div>
    <div *ngIf="approvals.length === 0" class="card empty-state">
      <h3>No pending approvals</h3>
      <p>All teacher requests have been reviewed.</p>
    </div>
    <table *ngIf="approvals.length > 0">
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Requested</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let a of approvals">
          <td><strong>{{ a.fullName }}</strong></td>
          <td>{{ a.email }}</td>
          <td>{{ a.phone || '-' }}</td>
          <td>{{ a.createdAt | date:'short' }}</td>
          <td>
            <div style="display: flex; gap: 8px;">
              <button class="btn btn-sm btn-success" (click)="review(a.id, true)">Approve</button>
              <button class="btn btn-sm btn-danger" (click)="review(a.id, false)">Deny</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminApprovalsComponent implements OnInit {
  approvals: any[] = [];
  message = '';

  constructor(private api: AdminApiService) {}

  ngOnInit() { this.load(); }

  load() { this.api.approvals().subscribe(a => this.approvals = a); }

  review(id: number, approve: boolean) {
    this.api.review(id, approve).subscribe({
      next: () => {
        this.message = approve ? 'Teacher approved!' : 'Teacher denied.';
        this.load();
      }
    });
  }
}
