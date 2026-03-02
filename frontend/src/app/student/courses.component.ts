import { Component, OnInit } from '@angular/core';
import { StudentApiService } from './student-api.service';

@Component({
  template: `
    <div class="page-header">
      <h1>Available Courses</h1>
    </div>
    <div *ngIf="message" class="alert" [class.alert-success]="!isError" [class.alert-error]="isError">{{ message }}</div>
    <div class="grid-3">
      <div *ngFor="let c of courses" class="card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
          <h3 style="margin-bottom: 0;">{{ c.title }}</h3>
          <span class="badge" [ngClass]="{'badge-green': c.status==='PUBLISHED', 'badge-gray': c.status==='DRAFT', 'badge-red': c.status==='BLOCKED'}">{{ c.status }}</span>
        </div>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">{{ c.category || 'General' }} &middot; {{ c.level || 'All Levels' }}</p>
        <p style="color: #6b7280; font-size: 13px; margin-bottom: 12px;">By {{ c.instructorName || 'Unknown' }}</p>
        <p style="font-size: 14px; color: #374151; margin-bottom: 16px;">{{ (c.description || '').substring(0, 120) }}{{ c.description?.length > 120 ? '...' : '' }}</p>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary" (click)="enroll(c.id)">Enroll</button>
          <a [routerLink]="['/student/course', c.id]" class="btn btn-sm btn-outline">Details</a>
        </div>
      </div>
    </div>
    <div *ngIf="courses.length === 0" class="card empty-state">
      <h3>No courses available</h3>
      <p>Check back later for new courses.</p>
    </div>
  `
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  message = '';
  isError = false;

  constructor(private api: StudentApiService) {}

  ngOnInit() { this.api.courses().subscribe(c => this.courses = c); }

  enroll(courseId: number) {
    this.api.enroll(courseId).subscribe({
      next: () => { this.message = 'Enrolled successfully!'; this.isError = false; },
      error: (e) => { this.message = e.error?.message || 'Enrollment failed'; this.isError = true; }
    });
  }
}
