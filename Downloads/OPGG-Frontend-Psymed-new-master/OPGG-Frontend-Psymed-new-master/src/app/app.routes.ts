import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./iam/pages/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
      {
      path: 'patient',
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./patients/pages/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent)
        },
        {
          path: 'appointments',
          loadComponent: () => import('./patients/pages/patient-appointments/patient-appointments.component').then(m => m.PatientAppointmentsComponent)
        },
        {
          path: 'book-appointment',
          loadComponent: () => import('./patients/pages/patient-book-appointment/patient-book-appointment.component').then(m => m.PatientBookAppointmentComponent)
        },
        {
          path: 'profile',
          loadComponent: () => import('./patients/pages/patient-profile/patient-profile.component').then(m => m.PatientProfileComponent)
        }
      ]
    },
  {
    path: 'medic',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./medics/pages/medic-dashboard/medic-dashboard.component').then(m => m.MedicDashboardComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./medics/pages/medic-appointments/medic-appointments.component').then(m => m.MedicAppointmentsComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./medics/pages/medic-management/medic-management.component').then(m => m.MedicManagementComponent)
      },
      {
        path: 'prescriptions',
        loadComponent: () => import('./medics/pages/medic-management/medic-management.component').then(m => m.MedicManagementComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./medics/pages/medic-profile/medic-profile.component').then(m => m.MedicProfileComponent)
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'patients',
        loadComponent: () => import('./patients/pages/patient-management/patient-management.component').then(m => m.PatientManagementComponent)
      },
      {
        path: 'medics',
        loadComponent: () => import('./medics/pages/medic-management/medic-management.component').then(m => m.MedicManagementComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./patients/pages/patient-management/patient-management.component').then(m => m.PatientManagementComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
