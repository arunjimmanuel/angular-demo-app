import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApplicationService } from './application.service';
import { JobApplication } from './models/job-application.model';



@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {
  ngOnInit(): void {
    this.loadApplications();
    if (!this.newApplication.appliedDate) {
      this.newApplication.appliedDate = this.getTodayDate();
    }
  }

  constructor(private applicationService: ApplicationService) { }

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
    this.applicationService.getAllApplications().subscribe(data => {
      this.jobApplications = data;
    }, error => {
      console.error('Failed to load applications', error);
    });
  }

  addApplication() {
    const appToAdd = { ...this.newApplication };
    delete appToAdd.id;
    this.applicationService.saveNewApplication(appToAdd).subscribe((createdApp) => {
      this.jobApplications.push(createdApp);
      this.newApplication = { id: '', company: '', jobTitle: '', appliedDate: '', status: 'applied' };
    });
  }


  deleteApplication(app: JobApplication) {
    const index = this.jobApplications.indexOf(app);
    if (index > -1 && this.jobApplications[index].id) {
      this.applicationService.deleteApplication(this.jobApplications[index].id).subscribe(() => {
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

    if (app.id) {
      this.applicationService.updateApplication(app.id, updatedApp)
        .subscribe(() => {
          console.log('Application updated successfully!');
        }, error => {
          console.error('Failed to update application', error);
        });
    }
  }


  getApplicationsByStatus(status: string) {
    return this.jobApplications.filter(app => app.status === status);
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
