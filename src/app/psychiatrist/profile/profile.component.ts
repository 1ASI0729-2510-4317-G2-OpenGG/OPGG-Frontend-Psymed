import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <mat-icon class="avatar-icon">account_circle</mat-icon>
          </div>
          <div class="profile-info">
            <h1>{{ doctorName }}</h1>
            <p class="role">Psychiatrist</p>
            <p class="email">{{ email }}</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="profile-details">
          <h2>Professional Information</h2>

          <div class="info-section">
            <h3>Specialization</h3>
            <p>Psychiatry</p>
          </div>

          <div class="info-section">
            <h3>License Number</h3>
            <p>{{ licenseNumber || 'Not provided' }}</p>
          </div>

          <div class="info-section">
            <h3>Experience</h3>
            <p>{{ experience || '5+ years' }}</p>
          </div>

          <div class="info-section">
            <h3>Languages</h3>
            <p>English, Spanish</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="profile-actions">
          <button mat-raised-button color="primary">
            <mat-icon>edit</mat-icon>
            Edit Profile
          </button>
          <button mat-raised-button color="accent">
            <mat-icon>lock</mat-icon>
            Change Password
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-card {
      border-radius: 12px;
    }

    .profile-header {
      display: flex;
      align-items: center;
      padding: 24px;
    }

    .profile-avatar {
      margin-right: 24px;
    }

    .avatar-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #3f51b5;
    }

    .profile-info h1 {
      margin: 0;
      font-size: 2rem;
      color: #333;
    }

    .role {
      margin: 4px 0;
      color: #666;
      font-size: 1.1rem;
    }

    .email {
      margin: 4px 0;
      color: #666;
    }

    .profile-details {
      padding: 24px;
    }

    .profile-details h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .info-section {
      margin-bottom: 20px;
    }

    .info-section h3 {
      color: #666;
      font-size: 1rem;
      margin-bottom: 4px;
    }

    .info-section p {
      color: #333;
      font-size: 1.1rem;
      margin: 0;
    }

    .profile-actions {
      padding: 24px;
      display: flex;
      gap: 16px;
    }

    @media (max-width: 600px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-avatar {
        margin: 0 0 16px 0;
      }

      .profile-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class DoctorProfileComponent implements OnInit {
  doctorName = '';
  email = '';
  licenseNumber = '';
  experience = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.doctorName = user?.name || 'Dr. John Doe';
    this.email = user?.email || 'john.doe@example.com';
  }
}
