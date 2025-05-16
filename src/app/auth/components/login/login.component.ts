import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl: string = '';
  error: string = '';
  loading = false;
  selectedRole: 'doctor' | 'patient' | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Capturar el rol desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      if (params['role'] && (params['role'] === 'doctor' || params['role'] === 'patient')) {
        this.selectedRole = params['role'] as 'doctor' | 'patient';
      }
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Reset login status
    this.authService.logout();

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    // Si hay un rol seleccionado, usamos ese username
    let username = this.f['username'].value;
    if (this.selectedRole) {
      username = this.selectedRole;
    }

    this.authService.login(username, this.f['password'].value)
      .subscribe({
        next: () => {
          // Navigate based on user role
          const user = this.authService.currentUserValue;
          if (user?.role === 'doctor') {
            this.router.navigate(['/doctor/dashboard']);
          } else if (user?.role === 'patient') {
            this.router.navigate(['/patient/dashboard']);
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
