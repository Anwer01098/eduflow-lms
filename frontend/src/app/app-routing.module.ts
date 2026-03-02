import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'student', canActivate: [AuthGuard, RoleGuard], data: { roles: ['STUDENT', 'ADMIN'] }, loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'teacher', canActivate: [AuthGuard, RoleGuard], data: { roles: ['TEACHER', 'ADMIN'] }, loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'admin', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
