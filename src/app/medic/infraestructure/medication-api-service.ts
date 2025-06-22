import { Injectable } from '@angular/core';
import { Medication } from '../model/medications.entity';
import { mainservice } from '../../shared/service/main.service.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationApiService extends mainservice<Medication> {
  protected override resourceEndpoint = '/medications';
}
