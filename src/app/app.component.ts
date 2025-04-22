import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface JobApplication {
  company: string;
  role: string;
  appliedDate: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private http = inject(HttpClient);
  statuses: string[] = ['applied', 'interview', 'rejected'];
  jobApplications: JobApplication[] = [];
  newApplication: JobApplication = {
    company: '',
    role: '',
    appliedDate: '',
    status: 'applied'
  };
  draggedApp: JobApplication | null = null;

  

  addApplication() {
    const appToAdd = { ...this.newApplication };
    this.http.post<JobApplication>('http://localhost:3000/applications', appToAdd).subscribe(() => {
      this.jobApplications.push(appToAdd);
      this.newApplication = { company: '', role: '', appliedDate: '', status: 'applied' };
    });
  }

  deleteApplication(app: JobApplication) {
    const index = this.jobApplications.indexOf(app);
    if (index > -1) {
      this.http.delete(`http://localhost:3000/applications/${index}`).subscribe(() => {
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

  onDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    if (this.draggedApp) {
      const appIndex = this.jobApplications.findIndex(a => a === this.draggedApp);
      if (appIndex > -1) {
        this.jobApplications[appIndex].status = newStatus;
        this.draggedApp = null;
      }
    }
  }

  getApplicationsByStatus(status: string) {
    return this.jobApplications.filter(app => app.status === status);
  }
}
