# Documentación Técnica - Sistema de Citas Médicas

## 📋 Tabla de Contenidos

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Patrones de Diseño](#patrones-de-diseño)
3. [Estructura de Componentes](#estructura-de-componentes)
4. [Servicios y Lógica de Negocio](#servicios-y-lógica-de-negocio)
5. [Modelos de Datos](#modelos-de-datos)
6. [Routing y Navegación](#routing-y-navegación)
7. [Autenticación y Autorización](#autenticación-y-autorización)
8. [Componentes Reutilizables](#componentes-reutilizables)
9. [Mejores Prácticas](#mejores-prácticas)
10. [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura del Sistema

### Bounded Contexts

El sistema está organizado en contextos delimitados siguiendo principios de Domain-Driven Design:

```
src/app/
├── iam/                    # Identity and Access Management
├── patients/               # Patient Domain Context
├── medics/                 # Medical Professional Domain Context
├── shared/                 # Shared Resources
└── app.component.ts        # Root Component
```

### Arquitectura de Capas

```
┌─────────────────────────────────────┐
│           Presentation Layer        │
│         (Components & Pages)        │
├─────────────────────────────────────┤
│          Application Layer          │
│            (Services)               │
├─────────────────────────────────────┤
│           Domain Layer              │
│        (Models & Entities)          │
├─────────────────────────────────────┤
│        Infrastructure Layer         │
│      (HTTP, Local Storage)          │
└─────────────────────────────────────┘
```

## 🎨 Patrones de Diseño

### 1. Standalone Components Pattern
Todos los componentes utilizan el patrón standalone para mejor tree-shaking:

```typescript
@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CalendarComponent],
  // ...
})
export class PatientDashboardComponent { }
```

### 2. Service Layer Pattern
Separación clara entre lógica de presentación y lógica de negocio:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment> {
  // Lógica de negocio centralizada
}
```

### 3. Observer Pattern
Uso de RxJS Observables para manejo reactivo de datos:

```typescript
getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
  return of(this.mockAppointments.filter(/* ... */));
}
```

### 4. Factory Pattern
Creación de entidades con constructores especializados:

```typescript
export class Appointment {
  constructor(data: Partial<Appointment> = {}) {
    Object.assign(this, data);
    this.createdAt = this.createdAt || new Date();
  }
}
```

## 🧩 Estructura de Componentes

### Jerarquía de Componentes

```
AppComponent
├── LoginComponent (iam/)
├── PatientDashboard (patients/)
│   ├── CalendarComponent (shared/)
│   └── AppointmentListComponent
├── MedicDashboard (medics/)
│   ├── CalendarComponent (shared/)
│   ├── PatientListComponent
│   └── PrescriptionFormComponent
└── AdminDashboard
    ├── UserManagementComponent
    └── ReportsComponent
```

### Comunicación entre Componentes

#### Parent-Child Communication
```typescript
// Parent Component
@Component({
  template: `
    <app-calendar 
      [appointments]="patientAppointments"
      [userType]="'patient'"
      (dayClicked)="onDayClicked($event)">
    </app-calendar>
  `
})
export class PatientDashboardComponent {
  onDayClicked(day: CalendarDay): void {
    // Handle day click event
  }
}

// Child Component
@Component({
  selector: 'app-calendar'
})
export class CalendarComponent {
  @Input() appointments: Appointment[] = [];
  @Input() userType: 'patient' | 'medic' = 'patient';
  @Output() dayClicked = new EventEmitter<CalendarDay>();
}
```

## 🔧 Servicios y Lógica de Negocio

### BaseService
Servicio base con funcionalidades comunes:

```typescript
export abstract class BaseService<T> {
  protected resourceEndpoint: string = '';
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // CRUD operations
  getAll(): Observable<T[]> { /* ... */ }
  getById(id: number): Observable<T> { /* ... */ }
  create(item: T): Observable<T> { /* ... */ }
  update(id: number, item: T): Observable<T> { /* ... */ }
  delete(id: number): Observable<void> { /* ... */ }
}
```

### Servicios Específicos

#### AppointmentService
```typescript
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment> {
  
  /**
   * Obtiene citas filtradas por paciente
   * @param patientId ID del paciente
   * @returns Observable con array de citas
   */
  getAppointmentsByPatient(patientId: number): Observable<Appointment[]> {
    const patientAppointments = this.mockAppointments.filter(
      appointment => appointment.patientId === patientId
    );
    return of(patientAppointments);
  }

  /**
   * Obtiene horarios disponibles para un médico en una fecha
   * @param medicId ID del médico
   * @param date Fecha en formato YYYY-MM-DD
   * @returns Observable con array de horarios disponibles
   */
  getAvailableTimeSlots(medicId: number, date: string): Observable<string[]> {
    const allSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    const bookedSlots = this.mockAppointments
      .filter(appointment =>
        appointment.medicId === medicId &&
        appointment.date === date &&
        appointment.status !== 'cancelled'
      )
      .map(appointment => appointment.time);

    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    return of(availableSlots);
  }
}
```

#### PrescriptionService
```typescript
@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends BaseService<Prescription> {
  
  /**
   * Crea una nueva prescripción médica
   * @param prescription Datos de la prescripción
   * @returns Observable con la prescripción creada
   */
  createPrescription(prescription: Prescription): Observable<Prescription> {
    const newId = Math.max(...this.mockPrescriptions.map(p => p.id)) + 1;
    prescription.id = newId;
    prescription.createdAt = new Date();
    prescription.status = 'active';
    
    // Calcular fecha de expiración (30 días por defecto)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    prescription.expiresAt = expirationDate;

    this.mockPrescriptions.push(prescription);
    return of(prescription);
  }

  /**
   * Añade un medicamento a una prescripción existente
   * @param prescriptionId ID de la prescripción
   * @param medication Medicamento a añadir
   * @returns Observable con la prescripción actualizada
   */
  addMedication(prescriptionId: number, medication: Medication): Observable<Prescription> {
    const prescription = this.mockPrescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
      prescription.medications.push(medication);
      return of(prescription);
    }
    throw new Error('Prescripción no encontrada');
  }
}
```

## 📊 Modelos de Datos

### Entidades Principales

#### Patient Entity
```typescript
/**
 * Entidad que representa un paciente en el sistema
 */
export class Patient {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  dateOfBirth: Date = new Date();
  address: string = '';
  
  // Información médica
  medicalHistory: string[] = [];
  allergies: string[] = [];
  emergencyContact: string = '';
  bloodType: string = '';
  
  // Metadata
  profilePhoto?: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(data: Partial<Patient> = {}) {
    Object.assign(this, data);
  }

  /**
   * Obtiene el nombre completo del paciente
   * @returns Nombre y apellido concatenados
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Calcula la edad del paciente
   * @returns Edad en años
   */
  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}
```

#### Medic Entity
```typescript
/**
 * Entidad que representa un médico en el sistema
 */
export class Medic {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  
  // Información profesional
  specialty: string = '';
  licenseNumber: string = '';
  yearsOfExperience: number = 0;
  education: string[] = [];
  certifications: string[] = [];
  languages: string[] = [];
  
  // Disponibilidad y horarios
  availability: WeeklyAvailability = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    [key: string]: boolean
  };
  
  schedules: WeeklySchedule = {
    monday: { start: '', end: '' },
    tuesday: { start: '', end: '' },
    wednesday: { start: '', end: '' },
    thursday: { start: '', end: '' },
    friday: { start: '', end: '' },
    saturday: { start: '', end: '' },
    sunday: { start: '', end: '' },
    [key: string]: DaySchedule
  };
  
  // Estadísticas
  totalPatients: number = 0;
  rating: number = 0;
  
  // Metadata
  profilePhoto?: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(data: Partial<Medic> = {}) {
    Object.assign(this, data);
  }

  /**
   * Obtiene el nombre completo del médico con título
   * @returns Nombre con prefijo "Dr./Dra."
   */
  getFullName(): string {
    return `Dr. ${this.firstName} ${this.lastName}`;
  }

  /**
   * Verifica si el médico está disponible en un día específico
   * @param day Día de la semana
   * @returns true si está disponible
   */
  isAvailableOn(day: string): boolean {
    return this.availability[day] || false;
  }
}
```

### Interfaces de Soporte

#### WeeklyAvailability
```typescript
export interface WeeklyAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  [key: string]: boolean; // Index signature para acceso dinámico
}
```

#### DaySchedule
```typescript
export interface DaySchedule {
  start: string; // Formato HH:MM
  end: string;   // Formato HH:MM
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  [key: string]: DaySchedule; // Index signature para acceso dinámico
}
```

## 🛣️ Routing y Navegación

### Configuración de Rutas

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  
  // Rutas de autenticación
  {
    path: 'auth/login',
    loadComponent: () => import('./iam/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  
  // Rutas de pacientes
  {
    path: 'patient',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./patients/pages/patient-dashboard/patient-dashboard.component')
          .then(m => m.PatientDashboardComponent),
        canActivate: [AuthGuard],
        data: { role: 'patient' }
      },
      {
        path: 'appointments',
        loadComponent: () => import('./patients/pages/patient-appointments/patient-appointments.component')
          .then(m => m.PatientAppointmentsComponent),
        canActivate: [AuthGuard],
        data: { role: 'patient' }
      }
    ]
  },
  
  // Rutas de médicos
  {
    path: 'medic',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./medics/pages/medic-dashboard/medic-dashboard.component')
          .then(m => m.MedicDashboardComponent),
        canActivate: [AuthGuard],
        data: { role: 'medic' }
      }
    ]
  }
];
```

### Guards de Autenticación

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    const requiredRole = route.data['role'];
    if (requiredRole && currentUser.role !== requiredRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    
    return true;
  }
}
```

## 🔐 Autenticación y Autorización

### AuthService

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Usuarios de prueba
  private mockUsers: User[] = [
    {
      id: 1,
      email: 'patient@test.com',
      password: '123456',
      role: 'patient',
      name: 'Ana López'
    },
    {
      id: 2,
      email: 'medico@test.com',
      password: '123456',
      role: 'medic',
      name: 'Dr. Juan Pérez'
    }
  ];

  /**
   * Autentica un usuario en el sistema
   * @param email Email del usuario
   * @param password Contraseña
   * @returns Observable con el usuario autenticado
   */
  login(email: string, password: string): Observable<User> {
    const user = this.mockUsers.find(u => 
      u.email === email && u.password === password
    );
    
    if (user) {
      // Simular token JWT
      const token = btoa(JSON.stringify({ 
        userId: user.id, 
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
      }));
      
      localStorage.setItem('authToken', token);
      this.currentUserSubject.next(user);
      return of(user);
    }
    
    return throwError('Credenciales inválidas');
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene el usuario actualmente autenticado
   * @returns Usuario actual o null
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }
}
```

## 🔄 Componentes Reutilizables

### CalendarComponent

```typescript
/**
 * Componente de calendario reutilizable para mostrar citas y disponibilidad
 * 
 * @example
 * <app-calendar 
 *   [appointments]="appointments"
 *   [availability]="availability"
 *   [userType]="'patient'"
 *   (dayClicked)="onDayClicked($event)">
 * </app-calendar>
 */
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  /** Array de citas a mostrar en el calendario */
  @Input() appointments: Appointment[] = [];
  
  /** Disponibilidad por fecha (solo para médicos) */
  @Input() availability: { [key: string]: boolean } = {};
  
  /** Tipo de usuario que ve el calendario */
  @Input() userType: 'patient' | 'medic' = 'patient';
  
  /** Evento emitido cuando se hace clic en un día */
  @Output() dayClicked = new EventEmitter<CalendarDay>();
  
  /** Evento emitido cuando se hace clic en una cita */
  @Output() appointmentClicked = new EventEmitter<Appointment>();

  currentDate = new Date();
  calendarDays: CalendarDay[] = [];
  dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  ngOnInit() {
    this.generateCalendar();
  }

  /**
   * Genera los días del calendario para el mes actual
   */
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // Lógica de generación del calendario...
  }

  /**
   * Navega al mes anterior
   */
  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  /**
   * Navega al mes siguiente
   */
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
}
```

### BaseFormComponent

```typescript
/**
 * Componente base para formularios con validación común
 */
export abstract class BaseFormComponent {
  protected formBuilder = inject(FormBuilder);
  
  /** Formulario reactivo */
  form!: FormGroup;
  
  /** Estado de carga */
  isLoading = false;
  
  /** Errores de validación */
  errors: { [key: string]: string } = {};

  /**
   * Inicializa el formulario
   * Debe ser implementado por las clases hijas
   */
  abstract initForm(): void;

  /**
   * Maneja el envío del formulario
   * Debe ser implementado por las clases hijas
   */
  abstract onSubmit(): void;

  /**
   * Valida un campo específico del formulario
   * @param fieldName Nombre del campo
   * @returns true si es válido
   */
  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.valid && field.touched : false;
  }

  /**
   * Obtiene el mensaje de error para un campo
   * @param fieldName Nombre del campo
   * @returns Mensaje de error o cadena vacía
   */
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.touched) {
      const errors = field.errors;
      if (errors['required']) return `${fieldName} es requerido`;
      if (errors['email']) return 'Email inválido';
      if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
```

## 📏 Mejores Prácticas

### 1. Nomenclatura de Archivos
```
- Components: kebab-case.component.ts
- Services: kebab-case.service.ts
- Models: kebab-case.entity.ts
- Interfaces: kebab-case.interface.ts
```

### 2. Estructura de Carpetas
```
feature/
├── components/           # Componentes específicos del feature
├── pages/               # Páginas/vistas principales
├── services/            # Servicios de dominio
├── model/              # Entidades y modelos
└── interfaces/         # Interfaces TypeScript
```

### 3. Manejo de Errores
```typescript
// En servicios
catchError((error: HttpErrorResponse) => {
  console.error('Error in service:', error);
  return throwError(() => new Error('Something went wrong'));
})

// En componentes
.subscribe({
  next: (data) => { /* handle success */ },
  error: (error) => {
    this.errorMessage = error.message;
    this.isLoading = false;
  }
});
```

### 4. Lazy Loading
```typescript
// Cargar componentes bajo demanda
{
  path: 'feature',
  loadComponent: () => import('./feature/feature.component')
    .then(m => m.FeatureComponent)
}
```

### 5. OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // Usar señales o observables para mejor rendimiento
}
```

## 🐛 Troubleshooting

### Errores Comunes

#### 1. "Property does not exist on type"
```typescript
// Problema: Acceso a propiedades no definidas
// Solución: Verificar tipos y definir propiedades correctamente

interface User {
  name: string;
  email: string;
}

// Usar optional chaining
user?.name
```

#### 2. "Observable expected but got Array"
```typescript
// Problema: Asignación incorrecta de observables
// Solución: Suscribirse al observable

// ❌ Incorrecto
this.appointments = this.appointmentService.getAppointments();

// ✅ Correcto
this.appointmentService.getAppointments().subscribe(
  appointments => this.appointments = appointments
);
```

#### 3. "Cannot read property of undefined"
```typescript
// Problema: Acceso a propiedades de objetos undefined
// Solución: Usar safe navigation operator

// ❌ Incorrecto
{{ user.name }}

// ✅ Correcto
{{ user?.name }}
```

### Debugging Tips

1. **Usar Angular DevTools** para inspeccionar componentes
2. **Console.log estratégico** en puntos clave
3. **Verificar network tab** para llamadas HTTP
4. **Usar breakpoints** en el navegador
5. **Revisar errores de TypeScript** antes de ejecutar

### Performance Tips

1. **Usar OnPush change detection** cuando sea posible
2. **Implementar lazy loading** para rutas
3. **Usar track by functions** en *ngFor
4. **Evitar subscripciones sin unsubscribe**
5. **Optimizar imágenes** y assets

---

**Última actualización:** Enero 2024
**Versión:** 1.0.0 
