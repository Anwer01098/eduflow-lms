import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentApiService } from './student-api.service';

@Component({
  template: `
    <div *ngIf="course" class="card">
      <div class="page-header" style="margin-bottom: 16px;">
        <h1>{{ course.title }}</h1>
        <span class="badge" [ngClass]="{'badge-green': course.status==='PUBLISHED', 'badge-gray': course.status==='DRAFT'}">{{ course.status }}</span>
      </div>
      <p style="color: #6b7280; margin-bottom: 16px;">By {{ course.instructorName || 'Unknown' }} &middot; {{ course.category || 'General' }} &middot; {{ course.level || 'All Levels' }}</p>
      <p style="margin-bottom: 24px;">{{ course.description }}</p>
      <div class="stat-cards">
        <div class="stat-card"><div class="stat-value">{{ course.modulesCount || 0 }}</div><div class="stat-label">Modules</div></div>
        <div class="stat-card"><div class="stat-value">{{ course.studentsCount || 0 }}</div><div class="stat-label">Students</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Assignments</h2>
      <div *ngIf="assignments.length === 0" class="empty-state"><h3>No assignments yet</h3></div>
      <div *ngFor="let a of assignments" style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="display: flex; justify-content: space-between;">
          <strong>{{ a.title }}</strong>
          <span class="badge badge-blue">Max: {{ a.maxGrade }}</span>
        </div>
        <p style="color: #6b7280; font-size: 13px; margin-top: 4px;">{{ a.description }}</p>
      </div>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {
  course: any = null;
  assignments: any[] = [];

  constructor(private route: ActivatedRoute, private api: StudentApiService) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.api.courseById(id).subscribe(c => this.course = c);
    this.api.assignments(id).subscribe(a => this.assignments = a);
  }
}
