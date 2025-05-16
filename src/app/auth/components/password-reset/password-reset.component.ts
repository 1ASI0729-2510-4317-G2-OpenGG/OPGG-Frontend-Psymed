import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule
  ],
  template: `
    <div class="password-reset-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Reset Password</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-stepper [linear]="true" #stepper>
            <mat-step [stepControl]="emailForm">
              <form [formGroup]="emailForm">
                <ng-template matStepLabel>Enter Email</ng-template>

                <mat-form-field>
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="Enter your email">
                  <mat-error *ngIf="emailForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="emailForm.get('email')?.hasError('email')">
                    Please enter a valid email address
                  </mat-error>
                </mat-form-field>

                <div class="step-actions">
                  <button mat-raised-button color="primary" (click)="sendResetCode()" [disabled]="!emailForm.valid">
                    Send Reset Code
                  </button>
                </div>
              </form>
            </mat-step>

            <mat-step [stepControl]="verificationForm">
              <form [formGroup]="verificationForm">
                <ng-template matStepLabel>Verify Code</ng-template>

                <mat-form-field>
                  <mat-label>Reset Code</mat-label>
                  <input matInput formControlName="code" placeholder="Enter the code sent to your email">
                  <mat-error *ngIf="verificationForm.get('code')?.hasError('required')">
                    Reset code is required
                  </mat-error>
                  <mat-error *ngIf="verificationForm.get('code')?.hasError('minlength')">
                    Please enter a valid reset code
                  </mat-error>
                </mat-form-field>

                <div class="step-actions">
                  <button mat-button (click)="stepper.previous()">Back</button>
                  <button mat-raised-button color="primary" (click)="verifyCode()" [disabled]="!verificationForm.valid">
                    Verify Code
                  </button>
                </div>
              </form>
            </mat-step>

            <mat-step [stepControl]="passwordForm">
              <form [formGroup]="passwordForm">
                <ng-template matStepLabel>New Password</ng-template>

                <mat-form-field>
                  <mat-label>New Password</mat-label>
                  <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                  <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  <mat-error *ngIf="passwordForm.get('password')?.hasError('required')">
                    Password is required
                  </mat-error>
                  <mat-error *ngIf="passwordForm.get('password')?.hasError('minlength')">
                    Password must be at least 6 characters long
                  </mat-error>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Confirm New Password</mat-label>
                  <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword">
                  <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                    <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
                    Please confirm your password
                  </mat-error>
                  <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('passwordMismatch')">
                    Passwords do not match
                  </mat-error>
                </mat-form-field>

                <div class="step-actions">
                  <button mat-button (click)="stepper.previous()">Back</button>
                  <button mat-raised-button color="primary" (click)="resetPassword()" [disabled]="!passwordForm.valid">
                    Reset Password
                  </button>
                </div>
              </form>
            </mat-step>
          </mat-stepper>

          <div class="login-link">
            Remember your password? <a routerLink="/auth/login">Login here</a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .password-reset-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    mat-card {
      padding: 2rem;
    }

    mat-card-title {
      margin-bottom: 1.5rem;
      color: #333;
      font-size: 1.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    mat-form-field {
      width: 100%;
    }

    .step-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .login-link {
      margin-top: 2rem;
      text-align: center;
      color: #666;
    }

    .login-link a {
      color: #3f51b5;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class PasswordResetComponent {
  emailForm: FormGroup;
  verificationForm: FormGroup;
  passwordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.verificationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  sendResetCode() {
    if (this.emailForm.valid) {
      // TODO: Implement send reset code logic
      console.log('Sending reset code to:', this.emailForm.value.email);
    }
  }

  verifyCode() {
    if (this.verificationForm.valid) {
      // TODO: Implement code verification logic
      console.log('Verifying code:', this.verificationForm.value.code);
    }
  }

  resetPassword() {
    if (this.passwordForm.valid) {
      // TODO: Implement password reset logic
      console.log('Resetting password:', this.passwordForm.value);
    }
  }
}
