import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to SPYMED</mat-card-title>
          <mat-card-subtitle>Please sign in to continue</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter your email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid">
                Sign In
              </button>
            </div>
          </form>

          <div class="additional-actions">
            <a routerLink="/auth/password-reset" class="forgot-password">
              Forgot your password?
            </a>
            <div class="register-link">
              Don't have an account? <a routerLink="/auth/register">Register here</a>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    mat-card {
      padding: 2rem;
    }

    mat-card-title {
      color: #333;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    mat-card-subtitle {
      color: #666;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      margin-top: 1rem;
    }

    .form-actions button {
      width: 100%;
      padding: 0.75rem;
    }

    .additional-actions {
      margin-top: 1.5rem;
      text-align: center;
    }

    .forgot-password {
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .register-link {
      margin-top: 1rem;
      color: #666;
    }

    .register-link a {
      color: #3f51b5;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const user = await this.authService.login(email, password);

        if (user.role === 'doctor') {
          this.router.navigate(['/doctor-dashboard']);
        } else {
          this.router.navigate(['/patient-dashboard']);
        }
      } catch (error) {
        console.error('Login failed:', error);
        // TODO: Implement proper error handling
      }
    }
  }
}
