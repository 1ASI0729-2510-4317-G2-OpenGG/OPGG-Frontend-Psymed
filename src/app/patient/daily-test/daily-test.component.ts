import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="daily-test-container">
      <h2>Test Diario</h2>
      <p>Complete su test diario para ayudar en su seguimiento</p>
      <!-- Contenido del componente -->
    </div>
  `,
  styles: [`
    .daily-test-container {
      padding: 24px;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 16px;
    }
  `]
})
export class DailyTestComponent {}
