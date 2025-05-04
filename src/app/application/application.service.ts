import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplication } from './models/job-application.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getAllApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${environment.apiUrl}/applications`);
  }

  saveNewApplication(applicationToAdd: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${environment.apiUrl}/applications`, applicationToAdd);
  }

  updateApplication(applicationId: string, updatedApplication: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${environment.apiUrl}/applications/${applicationId}`, updatedApplication);
  }

  deleteApplication(applicationId: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/applications/${applicationId}`);
  }
}
