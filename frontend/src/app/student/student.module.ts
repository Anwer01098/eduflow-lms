import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { CourseListComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail.component';
import { AssignmentsComponent } from './assignments.component';
import { NotificationsComponent } from './notifications.component';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  declarations: [DashboardComponent, CourseListComponent, CourseDetailComponent, AssignmentsComponent, NotificationsComponent, MessagesComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class StudentModule {}
