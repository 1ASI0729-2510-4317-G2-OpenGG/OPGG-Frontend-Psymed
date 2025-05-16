import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="role-selection-container">
      <div class="role-selection-header">
        <h1>SPYMED</h1>
        <p>Seleccione su tipo de usuario para continuar</p>
      </div>

      <div class="role-cards">
        <mat-card class="role-card" (click)="selectRole('doctor')">
          <mat-card-content>
            <div class="role-icon">
              <mat-icon>local_hospital</mat-icon>
            </div>
            <h2>Médico</h2>
            <p>Acceda a historiales médicos, citas y gestión de pacientes</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="role-card" (click)="selectRole('patient')">
          <mat-card-content>
            <div class="role-icon">
              <mat-icon>person</mat-icon>
            </div>
            <h2>Paciente</h2>
            <p>Acceda a sus citas, medicamentos y registros médicos</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./role-selection.component.css']
})
export class RoleSelectionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('RoleSelectionComponent initialized');
  }

  selectRole(role: 'doctor' | 'patient'): void {
    console.log(`Role selected: ${role}`);
    this.router.navigate(['/login'], { queryParams: { role } });
  }
}
