import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TeacherApiService } from './teacher-api.service';

@Component({
  template: `
    <div *ngIf="course">
      <div class="page-header">
        <h1>{{ course.title }}</h1>
        <span class="badge" [ngClass]="{'badge-green': course.status==='PUBLISHED', 'badge-gray': course.status==='DRAFT'}">{{ course.status }}</span>
      </div>
      <div class="stat-cards">
        <div class="stat-card"><div class="stat-value">{{ course.studentsCount || 0 }}</div><div class="stat-label">Students</div></div>
        <div class="stat-card"><div class="stat-value">{{ course.modulesCount || 0 }}</div><div class="stat-label">Modules</div></div>
        <div class="stat-card"><div class="stat-value">{{ assignments.length }}</div><div class="stat-label">Assignments</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Create Assignment</h2>
      <div *ngIf="assignmentMsg" class="alert alert-success">{{ assignmentMsg }}</div>
      <form [formGroup]="af" (ngSubmit)="createAssignment()">
        <div class="form-row">
          <div class="form-group"><label>Title</label><input formControlName="title" placeholder="Assignment title"></div>
          <div class="form-group"><label>Max Grade</label><input formControlName="maxGrade" type="number" placeholder="100"></div>
        </div>
        <div class="form-group"><label>Description</label><textarea formControlName="description" rows="3" placeholder="Assignment description"></textarea></div>
        <button class="btn btn-primary">Create Assignment</button>
      </form>
    </div>
    <div class="card">
      <h2>Assignments</h2>
      <div *ngIf="assignments.length === 0" class="empty-state"><h3>No assignments yet</h3></div>
      <div *ngFor="let a of assignments" style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>{{ a.title }}</strong>
            <p style="color: #6b7280; font-size: 13px; margin-top: 2px;">{{ a.description }}</p>
          </div>
          <span class="badge badge-blue">Max: {{ a.maxGrade }}</span>
        </div>
      </div>
    </div>
  `
})
export class TeacherCourseDetailComponent implements OnInit {
  course: any = null;
  assignments: any[] = [];
  assignmentMsg = '';
  af: any;

  constructor(private route: ActivatedRoute, private api: TeacherApiService, private fb: FormBuilder) {
    this.af = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      maxGrade: [100]
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.api.courseById(id).subscribe(c => this.course = c);
    this.loadAssignments(id);
  }

  loadAssignments(courseId: number) {
    this.api.assignments(courseId).subscribe(a => this.assignments = a);
  }

  createAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.api.createAssignment({ ...this.af.value, courseId: id }).subscribe({
      next: () => {
        this.assignmentMsg = 'Assignment created!';
        this.af.reset({ maxGrade: 100 });
        this.loadAssignments(id);
      }
    });
  }
}
