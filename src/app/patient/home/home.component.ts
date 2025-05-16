import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h2>Bienvenido, {{ patientName }}</h2>
        <p>Aquí tiene un resumen de su actividad</p>
      </div>

      <div class="cards-container">
        <div class="card" routerLink="../mood-state">
          <div class="card-icon">
            <span class="material-icons">mood</span>
          </div>
          <h3>Estado de Ánimo</h3>
          <p>Registre su estado de ánimo diario</p>
        </div>

        <div class="card" routerLink="../biological-functions">
          <div class="card-icon">
            <span class="material-icons">monitor_heart</span>
          </div>
          <h3>Funciones Biológicas</h3>
          <p>Registre sus funciones biológicas</p>
        </div>

        <div class="card" routerLink="../daily-test">
          <div class="card-icon">
            <span class="material-icons">assignment</span>
          </div>
          <h3>Test Diario</h3>
          <p>Complete su test diario</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 24px;
    }

    .welcome-section {
      margin-bottom: 32px;
    }

    .welcome-section h2 {
      color: #3f51b5;
      margin-bottom: 8px;
    }

    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .card {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .card-icon {
      background-color: #e8eaf6;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .card-icon .material-icons {
      color: #3f51b5;
      font-size: 24px;
    }

    .card h3 {
      color: #3f51b5;
      margin: 0 0 8px;
    }

    .card p {
      color: #666;
      margin: 0;
    }
  `]
})
export class HomeComponent implements OnInit {
  patientName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.patientName = `${user.firstName} ${user.lastName}`;
    }
  }
}
