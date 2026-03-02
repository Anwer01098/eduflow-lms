import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentApiService {
  constructor(private http: HttpClient) {}
  courses() { return this.http.get<any[]>('/api/courses'); }
  courseById(id: number) { return this.http.get<any>(`/api/courses/${id}`); }
  enroll(courseId: number) { return this.http.post('/api/courses/' + courseId + '/enroll', {}); }
  enrollments() { return this.http.get<any[]>('/api/courses/enrollments'); }
  assignments(courseId: number) { return this.http.get<any[]>('/api/assignments/course/' + courseId); }
  submit(payload: any) { return this.http.post('/api/assignments/submit', payload); }
}
