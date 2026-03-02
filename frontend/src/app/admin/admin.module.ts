import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard.component';
import { AdminUsersComponent } from './users.component';
import { AdminCoursesComponent } from './courses.component';
import { AdminApprovalsComponent } from './approvals.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'courses', component: AdminCoursesComponent },
  { path: 'approvals', component: AdminApprovalsComponent }
];

@NgModule({
  declarations: [AdminDashboardComponent, AdminUsersComponent, AdminCoursesComponent, AdminApprovalsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
