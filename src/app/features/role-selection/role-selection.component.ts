import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="role-selection-container">
      <h1>¡Bienvenido a PsyMed!</h1>
      <div class="cards-container">
        <mat-card (click)="navigateToLogin('patient')" class="role-card">
          <mat-card-content>
            <h2>Paciente</h2>
            <p>Accede como paciente para gestionar tus citas y tratamientos</p>
          </mat-card-content>
        </mat-card>

        <mat-card (click)="navigateToLogin('doctor')" class="role-card">
          <mat-card-content>
            <h2>Doctor</h2>
            <p>Accede como doctor para gestionar tus pacientes y consultas</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .role-selection-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #e0f7fa;
      padding: 2rem;
    }

    h1 {
      color: #333;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      text-align: center;
    }

    .cards-container {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1200px;
      width: 100%;
    }

    .role-card {
      width: 300px;
      cursor: pointer;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      padding: 2rem;
      text-align: center;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      }

      h2 {
        color: #1976d2;
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }

      p {
        color: #666;
        line-height: 1.5;
        font-size: 1.1rem;
      }
    }
  `]
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}

  navigateToLogin(role: 'patient' | 'doctor') {
    const route = role === 'doctor' ? '/dashboard/medico' : '/dashboard/paciente';
    this.router.navigate([route]);
  }
}
