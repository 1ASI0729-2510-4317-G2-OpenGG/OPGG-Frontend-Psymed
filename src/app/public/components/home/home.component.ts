import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div style="text-align: center; padding: 50px;">
      <h1>SPYMED - Bienvenido</h1>
      <p>Seleccione su tipo de usuario:</p>
      <div style="margin-top: 30px;">
        <button mat-raised-button color="primary" style="margin-right: 20px;" (click)="goToLogin('doctor')">
          Acceder como Médico
        </button>
        <button mat-raised-button color="accent" (click)="goToLogin('patient')">
          Acceder como Paciente
        </button>
      </div>
    </div>
  `,
  styles: [`
    h1 { color: #3f51b5; }
    p { font-size: 18px; margin: 20px 0; }
    button { padding: 10px 20px; }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {
    console.log('HomeComponent creado');
  }

  goToLogin(role: 'doctor' | 'patient'): void {
    console.log(`Navegando a login con rol: ${role}`);
    this.router.navigate(['/login'], { queryParams: { role } });
  }
}
