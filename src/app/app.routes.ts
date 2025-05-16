import { Routes } from '@angular/router';
import {AnalyticsDashboardComponent} from './Bc_Analytics/pages/analytics-dashboard/analytics-dashboard.component';

import {BannerPageComponent} from './public/pages/banner-page/banner-page.component';

import { MedicationListComponent } from './medic/components/medication-list/medication-list.component';
import {AddMedicationComponent} from './medic/components/medication-add/medication-add.component';

export const routes: Routes = [
  { path: 'dashboard-analitic/:id', component: AnalyticsDashboardComponent },
  { path: 'medication-list', component: MedicationListComponent },
  { path: 'medication-add', component: AddMedicationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },  // Default route that redirects to HomeComponent
  { path: 'home', component: BannerPageComponent },
];
