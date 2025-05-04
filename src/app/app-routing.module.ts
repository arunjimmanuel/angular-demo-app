
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'applications', component: ApplicationComponent },
    { path: '', redirectTo: '/applications', pathMatch: 'full' }, // default route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
