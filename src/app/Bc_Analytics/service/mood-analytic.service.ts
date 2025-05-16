import { Injectable } from '@angular/core';

import {map} from "rxjs";
import {mainservice} from '../../shared/service/main.service.service';
import {MoodAnalytic} from '../model/mood-analytic';

@Injectable({
  providedIn: 'root'
})
export class MoodAnalyticService extends mainservice<MoodAnalytic>{

  constructor() { super(), this.resourceEndpoint='/patient-mood-analytic'}

  findByDateAndPatientId(month: string, year: string, patientId: string) {
    return this.http.get<MoodAnalytic[]>(`${this.resourcePath()}?idPatient=${patientId}&month=${month}&year=${year}`, this.httpOptions)
      .pipe(map((response => response.length ? response [0] : null )))
  }

}
