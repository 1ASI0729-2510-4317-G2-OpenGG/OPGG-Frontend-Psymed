import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import {PatientProfileComponent} from './patient-profile/pages/patient-profile/patient-profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PatientProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'SPYMED';
}
