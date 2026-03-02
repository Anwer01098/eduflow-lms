import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherApiService } from './teacher-api.service';

@Component({
  template: `
    <div class="page-header"><h1>Create Course</h1></div>
    <div class="card">
      <div *ngIf="error" class="alert alert-error">{{ error }}</div>
      <form [formGroup]="f" (ngSubmit)="submit()">
        <div class="form-group"><label>Course Title</label><input formControlName="title" placeholder="Introduction to..."></div>
        <div class="form-group"><label>Description</label><textarea formControlName="description" rows="4" placeholder="What students will learn..."></textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Category</label><input formControlName="category" placeholder="e.g. Computer Science"></div>
          <div class="form-group"><label>Level</label>
            <select formControlName="level">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Modules Count</label><input formControlName="modulesCount" type="number" placeholder="0"></div>
          <div class="form-group"><label>Status</label>
            <select formControlName="status">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary" [disabled]="loading">{{ loading ? 'Creating...' : 'Create Course' }}</button>
      </form>
    </div>
  `
})
export class CreateCourseComponent {
  f = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    category: [''],
    level: ['Beginner'],
    modulesCount: [0],
    status: ['DRAFT']
  });
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private api: TeacherApiService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.api.createCourse(this.f.value).subscribe({
      next: () => this.router.navigate(['/teacher/courses']),
      error: (e) => { this.error = e.error?.message || 'Failed to create course'; this.loading = false; }
    });
  }
}
