import { Routes } from '@angular/router';
import { DoctorProfileComponent } from './profile/profile.component';
import { PatientListComponent } from './patients/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

export const PSYCHIATRIST_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  },
  {
    path: 'profile',
    component: DoctorProfileComponent
  },
  {
    path: 'patients',
    component: PatientListComponent
  },
  {
    path: 'patients/:id',
    component: PatientDetailComponent
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: 'appointments/new',
    component: AppointmentsComponent,
    data: { mode: 'new' }
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];
