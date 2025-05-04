// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'applications', component: ApplicationComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
