import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from './teacher-api.service';

@Component({
  template: `
    <div class="page-header">
      <h1>My Courses</h1>
      <a routerLink="/teacher/create-course" class="btn btn-primary">Create Course</a>
    </div>
    <div *ngIf="courses.length === 0" class="card empty-state">
      <h3>No courses created</h3>
      <p>Start by creating your first course.</p>
    </div>
    <table *ngIf="courses.length > 0">
      <thead><tr><th>Title</th><th>Category</th><th>Level</th><th>Students</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let c of courses">
          <td><strong>{{ c.title }}</strong></td>
          <td>{{ c.category || '-' }}</td>
          <td>{{ c.level || '-' }}</td>
          <td>{{ c.studentsCount || 0 }}</td>
          <td><span class="badge" [ngClass]="{'badge-green': c.status==='PUBLISHED', 'badge-gray': c.status==='DRAFT', 'badge-red': c.status==='BLOCKED'}">{{ c.status }}</span></td>
          <td><a [routerLink]="['/teacher/course', c.id]" class="btn btn-sm btn-outline">View</a></td>
        </tr>
      </tbody>
    </table>
  `
})
export class TeacherCoursesComponent implements OnInit {
  courses: any[] = [];
  constructor(private api: TeacherApiService) {}
  ngOnInit() { this.api.myCourses().subscribe(c => this.courses = c); }
}
