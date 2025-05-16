import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="unauthorized-container">
      <mat-card class="unauthorized-card">
        <mat-card-header>
          <mat-icon color="warn">error</mat-icon>
          <mat-card-title>Unauthorized Access</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>You do not have permission to access this page.</p>
          <p>Please log in with the appropriate account or contact your administrator.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/login">Back to Login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .unauthorized-card {
      max-width: 400px;
      padding: 20px;
      text-align: center;
    }
    mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 20px;
    }
    mat-card-title {
      margin-bottom: 20px;
      color: #f44336;
    }
    mat-card-content {
      margin-bottom: 20px;
    }
  `]
})
export class UnauthorizedComponent { }
