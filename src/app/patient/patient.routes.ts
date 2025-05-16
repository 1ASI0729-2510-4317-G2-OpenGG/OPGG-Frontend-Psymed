import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'mood-state',
    loadComponent: () => import('./mood-state/mood-state.component').then(m => m.MoodStateComponent)
  },
  {
    path: 'biological-functions',
    loadComponent: () => import('./biological-functions/biological-functions.component').then(m => m.BiologicalFunctionsComponent)
  },
  {
    path: 'daily-test',
    loadComponent: () => import('./daily-test/daily-test.component').then(m => m.DailyTestComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];
