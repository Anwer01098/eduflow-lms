import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  constructor(private http: HttpClient) {}
  approvals() { return this.http.get<any[]>('/api/admin/approvals'); }
  review(id: number, approve: boolean) { return this.http.patch('/api/admin/approvals/' + id + '?approve=' + approve, {}); }
  users() { return this.http.get<any[]>('/api/admin/users'); }
  courses() { return this.http.get<any[]>('/api/admin/courses'); }
  blockTeacher(profileId: number, reason: string) { return this.http.patch('/api/admin/teachers/' + profileId + '/block', { reason }); }
}
