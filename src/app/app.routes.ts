import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DoctorDashboardComponent } from './doctor/components/dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient/components/dashboard/patient-dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './public/components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'doctor/dashboard',
    component: DoctorDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'doctor' }
  },
  {
    path: 'patient/dashboard',
    component: PatientDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'patient' }
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./auth/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  { path: '**', redirectTo: '/' }
];
