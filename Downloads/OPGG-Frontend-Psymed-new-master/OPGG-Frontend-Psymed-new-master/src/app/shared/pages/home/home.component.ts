import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Sistema de Gestión de Citas Médicas</h1>
        <p>Gestiona eficientemente las citas entre médicos y pacientes</p>

        <div class="action-buttons">
          <a routerLink="/patients" class="btn btn-primary">
            <i class="icon">👥</i>
            Gestionar Pacientes
          </a>
          <a routerLink="/medics" class="btn btn-secondary">
            <i class="icon">👨‍⚕️</i>
            Gestionar Médicos
          </a>
        </div>
      </div>

      <div class="features-section">
        <div class="feature-card">
          <h3>Pacientes</h3>
          <p>Administra la información de los pacientes, historiales médicos y contactos de emergencia.</p>
        </div>

        <div class="feature-card">
          <h3>Médicos</h3>
          <p>Gestiona los perfiles de médicos, especialidades, horarios y tarifas de consulta.</p>
        </div>

        <div class="feature-card">
          <h3>Citas</h3>
          <p>Programa y administra citas médicas de manera eficiente.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .hero-section p {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin-bottom: 2rem;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background-color: #2980b9;
    }

    .btn-secondary {
      background-color: #2c3e50;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #34495e;
    }

    .icon {
      font-size: 1.2rem;
    }

    .features-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .feature-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #7f8c8d;
      line-height: 1.6;
    }
  `]
})
export class HomeComponent {}
