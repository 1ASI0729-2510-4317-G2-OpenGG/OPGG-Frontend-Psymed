import { Routes } from '@angular/router';
import { RoleSelectionComponent } from './features/role-selection/role-selection.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from './features/profile/doctor-profile.component';
import { PatientProfileComponent } from './features/profile/patient-profile.component';
import { PatientDetailsComponent } from './features/dashboard/patient-details/patient-details.component';
import { PatientDashboardComponent } from './features/dashboard/patient-dashboard/patient-dashboard.component';

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
        redirectTo: 'medico',
        pathMatch: 'full'
      },
      {
        path: 'medico',
        children: [
          {
            path: '',
            component: DoctorDashboardComponent
          },
          {
            path: 'paciente/:id',
            component: PatientDetailsComponent
          }
        ]
      },
      {
        path: 'paciente',
        component: PatientDashboardComponent
      }
    ]
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        redirectTo: 'medico',
        pathMatch: 'full'
      },
      {
        path: 'medico',
        component: DoctorProfileComponent
      },
      {
        path: 'paciente',
        component: PatientProfileComponent
      }
    ]
  }
];
