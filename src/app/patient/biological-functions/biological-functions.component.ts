import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biological-functions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="biological-functions-container">
      <h2>Funciones Biológicas</h2>
      <p>Aquí podrá registrar sus funciones biológicas diarias</p>
      <!-- Contenido del componente -->
    </div>
  `,
  styles: [`
    .biological-functions-container {
      padding: 24px;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 16px;
    }
  `]
})
export class BiologicalFunctionsComponent {}
