import { Component } from '@angular/core';

@Component({
  template: `
    <div class="page-header"><h1>My Assignments</h1></div>
    <div class="card empty-state">
      <h3>Select a course to view assignments</h3>
      <p>Go to your enrolled courses and view assignments from there.</p>
      <a routerLink="/student" class="btn btn-primary" style="margin-top: 12px;">Go to Dashboard</a>
    </div>
  `
})
export class AssignmentsComponent {}
