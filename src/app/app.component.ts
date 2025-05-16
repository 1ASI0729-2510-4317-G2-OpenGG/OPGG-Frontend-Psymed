import { Component } from '@angular/core';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { BiologicalFunctionsComponent } from './biological-functions/biological-functions.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, MoodTrackerComponent, BiologicalFunctionsComponent],
  template: `
    <div class="container">
      <h1>{{ 'APP.TITLE' | translate }}</h1>
      <app-mood-tracker></app-mood-tracker>
      <hr />
      <app-biological-functions></app-biological-functions>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
      margin: 30px auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
      margin-bottom: 40px;
    }
    hr {
      margin: 40px 0;
    }
  `]
})
export class AppComponent {
  title = 'Mi Aplicación';
}
