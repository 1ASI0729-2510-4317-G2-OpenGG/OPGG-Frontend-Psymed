import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h2>Mi Perfil</h2>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h3>Información Personal</h3>
          <div class="info-item">
            <span class="label">Nombre:</span>
            <span>{{ firstName }}</span>
          </div>
          <div class="info-item">
            <span class="label">Apellido:</span>
            <span>{{ lastName }}</span>
          </div>
          <div class="info-item">
            <span class="label">Email:</span>
            <span>{{ email }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 24px;
    }

    .profile-header {
      margin-bottom: 32px;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 16px;
    }

    .profile-content {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-section {
      margin-bottom: 24px;
    }

    h3 {
      color: #3f51b5;
      margin-bottom: 16px;
      font-size: 1.2em;
    }

    .info-item {
      margin-bottom: 12px;
      display: flex;
      gap: 8px;
    }

    .label {
      font-weight: 500;
      color: #666;
      min-width: 100px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    }
  }
}
