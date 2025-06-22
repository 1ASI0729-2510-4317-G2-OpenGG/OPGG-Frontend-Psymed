import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './features/role-selection/role-selection.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from './features/profile/doctor-profile.component';
import { PatientDetailsComponent } from './features/dashboard/patient-details/patient-details.component';

export const routes: Routes = [
  {
    path: '',
    component: RoleSelectionComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DoctorDashboardComponent
      },
      {
        path: 'patient/:id',
        component: PatientDetailsComponent
      }
    ]
  },
  {
    path: 'profile',
    component: DoctorProfileComponent
  }
];
