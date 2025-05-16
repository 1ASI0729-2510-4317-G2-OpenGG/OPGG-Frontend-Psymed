import { Injectable } from '@angular/core';
import {mainservice} from '../../shared/service/main.service.service';
import {BiologicalAnalytic} from '../model/biological-analytic';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiologicalAnalyticService extends mainservice<BiologicalAnalytic>{

  constructor() {
    super();
    this.resourceEndpoint = '/patient-biological-analytic'
  }

  findByDateAndPatientId(month: string, year: string, patientId: string) {
    return this.http.get<BiologicalAnalytic[]>(`${this.resourcePath()}?idPatient=${patientId}&month=${month}&year=${year}`, this.httpOptions)
      .pipe(map((response) => response.length ? response[0] : null))
  }
}
