import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  template: `
    <div class="login-container">
      <h1>{{ 'Welcome to PsyMed!' | translate }}</h1>
      <h2>{{ 'Login as ' + role | translate }}</h2>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <mat-form-field appearance="outline">
          <mat-label>{{ 'Email' | translate }}</mat-label>
          <mat-icon matPrefix class="form-icon">mail</mat-icon>
          <input matInput formControlName="email" type="email" required>
          <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
            {{ 'Email is required' | translate }}
          </mat-error>
          <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">
            {{ 'Invalid email format' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ 'Password' | translate }}</mat-label>
          <mat-icon matPrefix class="form-icon">lock</mat-icon>
          <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" required>
          <button type="button"
                  mat-icon-button
                  matSuffix
                  (click)="hidePassword = !hidePassword"
                  [attr.aria-label]="'Hide password'"
                  [attr.aria-pressed]="hidePassword">
            <mat-icon class="form-icon">{{ hidePassword ? 'visibility' : 'visibility_off' }}</mat-icon>
          </button>
          <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">
            {{ 'Password is required' | translate }}
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid" class="submit-button">
          <mat-icon>login</mat-icon>
          <span>{{ 'Login' | translate }}</span>
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #e0f7fa;
      padding: 2rem;
    }

    h1 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 2.5rem;
      text-align: center;
    }

    h2 {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      text-align: center;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      mat-form-field {
        width: 100%;
      }
    }

    .form-icon {
      color: #666;
      margin-right: 8px;
    }

    .submit-button {
      margin-top: 1rem;
      padding: 0.75rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      mat-icon {
        margin-right: 4px;
      }
    }

    ::ng-deep {
      .mat-mdc-form-field-icon-prefix > .mat-icon {
        padding: 12px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  role: string = 'doctor';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'] || 'doctor';
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Por ahora, simplemente redirigimos al dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
