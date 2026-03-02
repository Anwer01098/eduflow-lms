import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TeacherDashboardComponent } from './dashboard.component';
import { TeacherCoursesComponent } from './courses.component';
import { TeacherCourseDetailComponent } from './course-detail.component';
import { CreateCourseComponent } from './create-course.component';
import { TeacherGradingComponent } from './grading.component';
import { AiAssistantComponent } from './ai-assistant.component';
import { PendingApprovalComponent } from './pending.component';

const routes: Routes = [
  { path: '', component: TeacherDashboardComponent },
  { path: 'courses', component: TeacherCoursesComponent },
  { path: 'course/:id', component: TeacherCourseDetailComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'grading', component: TeacherGradingComponent },
  { path: 'ai-assistant', component: AiAssistantComponent },
  { path: 'pending', component: PendingApprovalComponent }
];

@NgModule({
  declarations: [TeacherDashboardComponent, TeacherCoursesComponent, TeacherCourseDetailComponent, CreateCourseComponent, TeacherGradingComponent, AiAssistantComponent, PendingApprovalComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class TeacherModule {}
