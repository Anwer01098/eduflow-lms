import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin-api.service';

@Component({
  template: `
    <div class="page-header"><h1>All Courses</h1></div>
    <div *ngIf="courses.length === 0" class="card empty-state">
      <h3>No courses yet</h3>
      <p>Courses created by teachers will appear here.</p>
    </div>
    <table *ngIf="courses.length > 0">
      <thead><tr><th>Title</th><th>Instructor</th><th>Category</th><th>Students</th><th>Status</th></tr></thead>
      <tbody>
        <tr *ngFor="let c of courses">
          <td><strong>{{ c.title }}</strong></td>
          <td>{{ c.instructorName || '-' }}</td>
          <td>{{ c.category || '-' }}</td>
          <td>{{ c.studentsCount || 0 }}</td>
          <td><span class="badge" [ngClass]="{'badge-green': c.status==='PUBLISHED', 'badge-gray': c.status==='DRAFT', 'badge-red': c.status==='BLOCKED'}">{{ c.status }}</span></td>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminCoursesComponent implements OnInit {
  courses: any[] = [];
  constructor(private api: AdminApiService) {}
  ngOnInit() { this.api.courses().subscribe(c => this.courses = c); }
}
