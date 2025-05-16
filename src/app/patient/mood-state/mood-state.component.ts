import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mood-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mood-state-container">
      <h2>Estado de Ánimo</h2>
      <p>Aquí podrá registrar su estado de ánimo diario</p>
      <!-- Contenido del componente -->
    </div>
  `,
  styles: [`
    .mood-state-container {
      padding: 24px;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 16px;
    }
  `]
})
export class MoodStateComponent {}
