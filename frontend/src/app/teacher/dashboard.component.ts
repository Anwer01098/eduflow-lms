import { Component, OnInit } from '@angular/core';
import { TeacherApiService } from './teacher-api.service';

@Component({
  template: `
    <div class="page-header">
      <h1>Teacher Dashboard</h1>
      <a routerLink="/teacher/create-course" class="btn btn-primary">Create Course</a>
    </div>
    <div *ngIf="status === 'PENDING'" class="alert alert-warning">
      Your account is pending approval. You can browse but cannot create courses until approved.
    </div>
    <div *ngIf="status === 'BLOCKED'" class="alert alert-error">
      Your account has been blocked. Please contact support.
    </div>
    <div class="stat-cards">
      <div class="stat-card"><div class="stat-value">{{ courses.length }}</div><div class="stat-label">My Courses</div></div>
      <div class="stat-card"><div class="stat-value">{{ totalStudents }}</div><div class="stat-label">Total Students</div></div>
    </div>
    <div class="card">
      <h2>My Courses</h2>
      <div *ngIf="courses.length === 0" class="empty-state">
        <h3>No courses yet</h3>
        <p>Create your first course to get started.</p>
      </div>
      <div class="grid-3">
        <div *ngFor="let c of courses" class="card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <h3 style="margin-bottom: 0;">{{ c.title }}</h3>
            <span class="badge" [ngClass]="{'badge-green': c.status==='PUBLISHED', 'badge-gray': c.status==='DRAFT'}">{{ c.status }}</span>
          </div>
          <p style="color: #6b7280; font-size: 13px; margin: 8px 0;">{{ c.studentsCount || 0 }} students &middot; {{ c.modulesCount || 0 }} modules</p>
          <a [routerLink]="['/teacher/course', c.id]" class="btn btn-sm btn-outline">Manage</a>
        </div>
      </div>
    </div>
  `
})
export class TeacherDashboardComponent implements OnInit {
  courses: any[] = [];
  status = localStorage.getItem('status') || 'ACTIVE';
  get totalStudents() { return this.courses.reduce((sum: number, c: any) => sum + (c.studentsCount || 0), 0); }

  constructor(private api: TeacherApiService) {}

  ngOnInit() {
    this.api.myCourses().subscribe(c => this.courses = c);
  }
}
