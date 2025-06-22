import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { DoctorDashboardComponent } from './psychiatrist/doctor-dashboard.component';
import { UnauthorizedComponent } from './auth/components/unauthorized/unauthorized.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'patient' },
    children: [
      {
        path: '',
        loadChildren: () => import('./patient/patient.routes').then(m => m.PATIENT_ROUTES)
      }
    ]
  },
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent,
    canActivate: [authGuard],
    data: { role: 'doctor' },
    children: [
      {
        path: '',
        loadChildren: () => import('./psychiatrist/psychiatrist.routes').then(m => m.PSYCHIATRIST_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
