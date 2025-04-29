import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';


interface JobApplication {
  id?: string;
  company: string;
  jobTitle: string;
  appliedDate: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.loadApplications();
    if (!this.newApplication.appliedDate) {
      this.newApplication.appliedDate = this.getTodayDate();
    }
  }
  private http = inject(HttpClient);
  statuses: string[] = ['applied', 'interview', 'rejected'];
  jobApplications: JobApplication[] = [];
  newApplication: JobApplication = {
    id: '',
    company: '',
    jobTitle: '',
    appliedDate: '',
    status: 'applied'
  };
  draggedApp: JobApplication | null = null;



  loadApplications(): void {
    this.http.get<JobApplication[]>(`${environment.apiUrl}/applications`)
      .subscribe((data) => {
        this.jobApplications = data;
        console.log('Applications loaded:', this.jobApplications);
      }, error => {
        console.error('Failed to load applications', error);
      });
  }

  addApplication() {
    const appToAdd = { ...this.newApplication };
    delete appToAdd.id;
    this.http.post<JobApplication>(`${environment.apiUrl}/applications`, appToAdd).subscribe((createdApp) => {
      this.jobApplications.push(createdApp);
      this.newApplication = { id: '', company: '', jobTitle: '', appliedDate: '', status: 'applied' };
    });
  }

  deleteApplication(app: JobApplication) {
    const index = this.jobApplications.indexOf(app);
    if (index > -1) {
      this.http.delete(`${environment.apiUrl}/applications/${this.jobApplications[index].id}`).subscribe(() => {
        this.jobApplications.splice(index, 1);
      });
    }
  }

  onDragStart(event: DragEvent, app: JobApplication) {
    this.draggedApp = app;
    event.dataTransfer?.setData('text/plain', JSON.stringify(app));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: string): void {
    event.preventDefault();
    if (this.draggedApp) {
      const appIndex = this.jobApplications.findIndex(a => a === this.draggedApp);
      if (appIndex > -1) {
        this.jobApplications[appIndex].status = newStatus;

        this.updateApplicationStatus(this.draggedApp, newStatus);

        this.draggedApp = null;
      }
    }
  }


  updateApplicationStatus(app: JobApplication, newStatus: string): void {
    const updatedApp = { ...app, status: newStatus };

    this.http.put<JobApplication>(`${environment.apiUrl}/applications/${app.id}`, updatedApp)
      .subscribe(() => {
        console.log('Application updated successfully!');
      }, error => {
        console.error('Failed to update application', error);
      });
  }


  getApplicationsByStatus(status: string) {
    return this.jobApplications.filter(app => app.status === status);
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
