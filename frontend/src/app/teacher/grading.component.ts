import { Component } from '@angular/core';

@Component({
  template: `
    <div class="page-header"><h1>Grading</h1></div>
    <div class="card empty-state">
      <h3>Grade from course details</h3>
      <p>Navigate to a course and view submissions to grade them.</p>
      <a routerLink="/teacher/courses" class="btn btn-primary" style="margin-top: 12px;">Go to Courses</a>
    </div>
  `
})
export class TeacherGradingComponent {}
