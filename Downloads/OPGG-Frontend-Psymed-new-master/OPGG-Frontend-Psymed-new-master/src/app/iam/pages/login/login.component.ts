import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  // Sistema de idiomas
  currentLanguage = 'es';
  texts: any = {};

  private spanishTexts = {
    title: 'Iniciar Sesión',
    subtitle: 'Sistema de Gestión de Citas Médicas',
    email: 'Email',
    emailPlaceholder: 'Ingrese su email',
    emailError: 'Email es requerido y debe ser válido',
    password: 'Contraseña',
    passwordPlaceholder: 'Ingrese su contraseña',
    passwordError: 'Contraseña es requerida (mínimo 6 caracteres)',
    loginButton: 'Iniciar Sesión',
    loggingIn: 'Iniciando sesión...',
    quickAccess: 'Acceso Rápido (Demo)',
    demoNote: 'Para probar el sistema, usa estos usuarios de prueba:',
    patient: 'Paciente',
    doctor: 'Médico',
    administrator: 'Administrador',
    passwordNote: 'Contraseña para todos',
    invalidCredentials: 'Credenciales inválidas. Intenta con los usuarios de prueba.'
  };

  private englishTexts = {
    title: 'Login',
    subtitle: 'Medical Appointment Management System',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    emailError: 'Email is required and must be valid',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    passwordError: 'Password is required (minimum 6 characters)',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    quickAccess: 'Quick Access (Demo)',
    demoNote: 'To test the system, use these test users:',
    patient: 'Patient',
    doctor: 'Doctor',
    administrator: 'Administrator',
    passwordNote: 'Password for all',
    invalidCredentials: 'Invalid credentials. Try with the test users.'
  };

  // Usuarios de prueba
  testUsers = [
    { email: 'paciente@test.com', password: '123456', userType: 'patient', name: 'Ana López' },
    { email: 'medico@test.com', password: '123456', userType: 'medic', name: 'Dr. Juan Pérez' },
    { email: 'admin@test.com', password: '123456', userType: 'admin', name: 'Administrador' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Inicializar textos
    this.updateTexts();
  }

  // Método para cambiar idioma
  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.updateTexts();
  }

  private updateTexts(): void {
    this.texts = this.currentLanguage === 'es' ? this.spanishTexts : this.englishTexts;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = this.loginForm.value;

      // Simular autenticación
      setTimeout(() => {
        const user = this.testUsers.find(u =>
          u.email === formData.email && u.password === formData.password
        );

        if (user) {
          // Guardar información del usuario (en un caso real sería en un servicio)
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Redireccionar según el tipo de usuario
          this.redirectByUserType(user.userType);
        } else {
          this.errorMessage = this.texts.invalidCredentials;
        }

        this.isLoading = false;
      }, 1000);
    }
  }


  private redirectByUserType(userType: string): void {
    switch (userType) {
      case 'patient':
        this.router.navigate(['/patient/dashboard']);
        break;
      case 'medic':
        this.router.navigate(['/medic/dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin/patients']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }

  // Métodos para login rápido (solo para desarrollo)
  quickLoginPatient(): void {
    this.loginForm.patchValue({
      email: 'paciente@test.com',
      password: '123456'
    });
  }

  quickLoginMedic(): void {
    this.loginForm.patchValue({
      email: 'medico@test.com',
      password: '123456'
    });
  }

  quickLoginAdmin(): void {
    this.loginForm.patchValue({
      email: 'admin@test.com',
      password: '123456'
    });
  }
}
