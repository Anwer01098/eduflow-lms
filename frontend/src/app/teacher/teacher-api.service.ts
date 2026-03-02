import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TeacherApiService {
  constructor(private http: HttpClient) {}
  myCourses() { return this.http.get<any[]>('/api/courses/instructor'); }
  createCourse(payload: any) { return this.http.post('/api/courses', payload); }
  courseById(id: number) { return this.http.get<any>(`/api/courses/${id}`); }
  createAssignment(payload: any) { return this.http.post('/api/assignments', payload); }
  assignments(courseId: number) { return this.http.get<any[]>('/api/assignments/course/' + courseId); }
  grade(submissionId: number, payload: any) { return this.http.patch('/api/assignments/submissions/' + submissionId + '/grade', payload); }
}
