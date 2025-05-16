import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MoodTrackerComponent } from '../mood-tracker/mood-tracker.component';
import { BiologicalFunctionsComponent } from '../biological-functions/biological-functions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, MoodTrackerComponent, BiologicalFunctionsComponent],
  template: `
    <mat-tab-group>
      <mat-tab label="Mood Tracker">
        <app-mood-tracker></app-mood-tracker>
      </mat-tab>
      <mat-tab label="Biological Functions">
        <app-biological-functions></app-biological-functions>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: []
})
export class HomeComponent {}
