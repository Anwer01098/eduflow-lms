import { Component, OnInit } from '@angular/core';
import { StudentApiService } from './student-api.service';

@Component({
  template: `
    <div class="page-header">
      <h1>Student Dashboard</h1>
    </div>
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-value">{{ enrollments.length }}</div>
        <div class="stat-label">Enrolled Courses</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ courses.length }}</div>
        <div class="stat-label">Available Courses</div>
      </div>
    </div>
    <div class="card">
      <h2>My Enrolled Courses</h2>
      <div *ngIf="enrollments.length === 0" class="empty-state">
        <h3>No enrollments yet</h3>
        <p>Browse available courses and enroll to get started.</p>
        <a routerLink="/student/courses" class="btn btn-primary" style="margin-top: 12px;">Browse Courses</a>
      </div>
      <div class="grid-3">
        <div *ngFor="let e of enrollments" class="card" style="margin-bottom: 0;">
          <h3>{{ getCourseTitle(e.courseId) }}</h3>
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 8px;">Progress: {{ e.progress || 0 }}%</p>
          <div style="background: #e5e7eb; border-radius: 4px; height: 6px; margin-bottom: 12px;">
            <div [style.width.%]="e.progress || 0" style="background: #4361ee; height: 6px; border-radius: 4px;"></div>
          </div>
          <a [routerLink]="['/student/course', e.courseId]" class="btn btn-sm btn-outline">View Course</a>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  enrollments: any[] = [];
  courses: any[] = [];

  constructor(private api: StudentApiService) {}

  ngOnInit() {
    this.api.enrollments().subscribe(e => this.enrollments = e);
    this.api.courses().subscribe(c => this.courses = c);
  }

  getCourseTitle(courseId: number): string {
    const course = this.courses.find((c: any) => c.id === courseId);
    return course ? course.title : 'Course #' + courseId;
  }
}
