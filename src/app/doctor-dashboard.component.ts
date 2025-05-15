import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>SPYMED - Dashboard Médico</h1>
        <div class="user-info">
          <span class="material-icons">account_circle</span>
          <span>{{ doctorName }}</span>
          <button (click)="logout()" class="logout-btn">
            <span class="material-icons">exit_to_app</span> Cerrar sesión
          </button>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="welcome-section">
          <h2>Bienvenido, {{ doctorName }}</h2>
          <p>Aquí tiene un resumen de su actividad</p>
        </div>

        <div class="cards-container">
          <div class="card">
            <div class="card-icon">
              <span class="material-icons">people</span>
            </div>
            <h3>Pacientes</h3>
            <div class="card-value">32</div>
            <p>Total de pacientes</p>
          </div>

          <div class="card">
            <div class="card-icon">
              <span class="material-icons">event</span>
            </div>
            <h3>Citas</h3>
            <div class="card-value">8</div>
            <p>Citas para hoy</p>
          </div>

          <div class="card">
            <div class="card-icon">
              <span class="material-icons">notifications</span>
            </div>
            <h3>Pendientes</h3>
            <div class="card-value">3</div>
            <p>Acciones pendientes</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      font-family: 'Roboto', sans-serif;
    }

    header {
      background-color: #3f51b5;
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .logout-btn {
      margin-left: 16px;
      background-color: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .logout-btn:hover {
      background-color: rgba(255,255,255,0.2);
    }

    .dashboard-content {
      padding: 24px;
    }

    .welcome-section {
      margin-bottom: 24px;
    }

    .welcome-section h2 {
      color: #3f51b5;
      margin-bottom: 8px;
    }

    .cards-container {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }

    .card {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 200px;
      text-align: center;
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
      margin: 0 auto 16px;
    }

    .card-icon .material-icons {
      color: #3f51b5;
      font-size: 24px;
    }

    .card h3 {
      color: #3f51b5;
      margin: 0 0 16px;
    }

    .card-value {
      font-size: 36px;
      font-weight: bold;
      color: #3f51b5;
      margin-bottom: 8px;
    }

    .card p {
      color: #666;
      margin: 0;
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  doctorName: string = 'Dr.';

  constructor(private router: Router) {
    console.log('DoctorDashboardComponent inicializado');
  }

  ngOnInit() {
    // Verificar si el usuario está autenticado y es un médico
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user.role === 'doctor') {
          this.doctorName = `${user.firstName} ${user.lastName}`;
        } else {
          // Redirigir si no es médico
          this.router.navigate(['/']);
        }
      } catch (e) {
        // Error al parsear, redirigir
        this.router.navigate(['/']);
      }
    } else {
      // No hay usuario, redirigir
      this.router.navigate(['/']);
    }
  }

  logout() {
    // Limpiar datos de usuario
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    // Redirigir al inicio
    this.router.navigate(['/']);
  }
}
