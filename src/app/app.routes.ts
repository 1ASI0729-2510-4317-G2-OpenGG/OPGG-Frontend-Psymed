import { Routes } from '@angular/router';

import { MedicationListComponent } from './medic/components/medication-list/medication-list.component';
import {AddMedicationComponent} from './medic/components/medication-add/medication-add.component';


export const routes: Routes = [
  { path: 'medication-list', component: MedicationListComponent },
  { path: 'medication-add', component: AddMedicationComponent },

];
