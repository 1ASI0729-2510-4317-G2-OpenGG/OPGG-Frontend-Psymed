import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
    <div style="text-align: center; padding: 50px;">
      <h1 style="color: #3f51b5; font-size: 36px; margin-bottom: 20px;">SPYMED</h1>
      <p style="font-size: 18px; margin-bottom: 30px;">Seleccione su tipo de usuario para continuar</p>

      <div style="display: flex; justify-content: center; gap: 30px;">
        <div class="role-card" (click)="selectRole('doctor')">
          <div class="role-icon">
            <span class="material-icons">local_hospital</span>
          </div>
          <h2>Médico</h2>
          <p>Acceda a historiales médicos, citas y gestión de pacientes</p>
        </div>

        <div class="role-card" (click)="selectRole('patient')">
          <div class="role-icon">
            <span class="material-icons">person</span>
          </div>
          <h2>Paciente</h2>
          <p>Acceda a sus citas, medicamentos y registros médicos</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .role-card {
      width: 250px;
      padding: 30px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: white;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
      text-align: center;
    }

    .role-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .role-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: #e8eaf6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }

    .role-icon .material-icons {
      font-size: 40px;
      color: #3f51b5;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }
  `]
})
export class RoleSelectorComponent {
  constructor(private router: Router) {
    console.log('RoleSelectorComponent inicializado');
  }

  selectRole(role: 'doctor' | 'patient') {
    console.log(`Rol seleccionado: ${role}`);

    // Guardar el rol en localStorage
    localStorage.setItem('userRole', role);

    // Simular credenciales de usuario para desarrollo
    const userData = {
      id: role === 'doctor' ? 1 : 2,
      username: role,
      role: role,
      email: `${role}@example.com`,
      firstName: role === 'doctor' ? 'Dr. Juan' : 'María',
      lastName: role === 'doctor' ? 'Pérez' : 'García'
    };

    // Guardar datos de usuario en localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));

    // Redirigir al dashboard correspondiente usando el Router de Angular
    this.router.navigate([`/${role}/dashboard`]);
  }
}
