import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>SPYMED</h1>
        <h2>Iniciar sesión</h2>

        <div class="role-selector">
          <p>Seleccione su tipo de usuario:</p>
          <div class="role-buttons">
            <button
              [class.active]="selectedRole === 'doctor'"
              (click)="selectRole('doctor')">
              <span class="material-icons">local_hospital</span>
              Médico
            </button>
            <button
              [class.active]="selectedRole === 'patient'"
              (click)="selectRole('patient')">
              <span class="material-icons">person</span>
              Paciente
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username"
            placeholder="Ingrese su nombre de usuario">
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            placeholder="Ingrese su contraseña">
        </div>

        <div class="error-message" *ngIf="error">{{ error }}</div>

        <button class="login-button" (click)="login()">Iniciar sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
      font-family: 'Roboto', sans-serif;
    }

    .login-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 30px;
      width: 400px;
      text-align: center;
    }

    h1 {
      color: #3f51b5;
      margin-bottom: 10px;
    }

    h2 {
      color: #555;
      margin-bottom: 30px;
    }

    .role-selector {
      margin-bottom: 30px;
    }

    .role-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
    }

    .role-buttons button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background-color: white;
      cursor: pointer;
      transition: all 0.3s;
      width: 120px;
    }

    .role-buttons button:hover {
      background-color: #f5f5f5;
    }

    .role-buttons button.active {
      border-color: #3f51b5;
      background-color: #e8eaf6;
    }

    .role-buttons .material-icons {
      font-size: 30px;
      margin-bottom: 8px;
      color: #3f51b5;
    }

    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #3f51b5;
    }

    .login-button {
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 20px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.3s;
    }

    .login-button:hover {
      background-color: #303f9f;
    }

    .error-message {
      color: #f44336;
      margin-bottom: 20px;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  selectedRole: 'doctor' | 'patient' | null = null;
  error: string = '';

  constructor(private router: Router) {}

  selectRole(role: 'doctor' | 'patient') {
    this.selectedRole = role;
  }

  login() {
    // Validación básica
    if (!this.selectedRole) {
      this.error = 'Por favor, seleccione un tipo de usuario';
      return;
    }

    if (!this.username.trim()) {
      this.error = 'Por favor, ingrese un nombre de usuario';
      return;
    }

    if (!this.password.trim()) {
      this.error = 'Por favor, ingrese una contraseña';
      return;
    }

    // Simular autenticación
    // En un caso real, esto sería una llamada a una API
    const isAuthenticated = true;

    if (isAuthenticated) {
      const userData = {
        id: this.selectedRole === 'doctor' ? 1 : 2,
        username: this.username,
        role: this.selectedRole,
        firstName: this.username,
        lastName: this.selectedRole === 'doctor' ? 'Dr.' : 'Paciente',
        email: `${this.username}@spymed.com`
      };

      // Guardar datos en localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('userRole', this.selectedRole);

      // Redirigir al dashboard correspondiente
      this.router.navigate([`/${this.selectedRole}/dashboard`]);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
