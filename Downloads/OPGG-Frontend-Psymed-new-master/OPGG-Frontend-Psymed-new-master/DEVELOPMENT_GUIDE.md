# Guía de Desarrollo - Sistema de Citas Médicas

## 🚀 Inicio Rápido

### Configuración del Entorno

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd learning-center
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
ng serve
```

4. **Acceder a la aplicación**
- URL: `http://localhost:4200`
- Usuario paciente: `patient@test.com` / `123456`
- Usuario médico: `medico@test.com` / `123456`
- Usuario admin: `admin@test.com` / `123456`

## 📁 Estructura del Proyecto

```
learning-center/
├── src/
│   ├── app/
│   │   ├── iam/                    # Autenticación
│   │   │   ├── pages/login/        # Página de login
│   │   │   └── services/           # Servicios de auth
│   │   ├── patients/               # Módulo de pacientes
│   │   │   ├── pages/              # Páginas de pacientes
│   │   │   ├── components/         # Componentes específicos
│   │   │   ├── model/              # Entidades de pacientes
│   │   │   └── services/           # Servicios de pacientes
│   │   ├── medics/                 # Módulo de médicos
│   │   │   ├── pages/              # Páginas de médicos
│   │   │   ├── components/         # Componentes específicos
│   │   │   ├── model/              # Entidades de médicos
│   │   │   └── services/           # Servicios de médicos
│   │   └── shared/                 # Recursos compartidos
│   │       ├── components/         # Componentes reutilizables
│   │       ├── model/              # Entidades base
│   │       └── services/           # Servicios compartidos
│   ├── assets/                     # Recursos estáticos
│   └── environments/               # Configuraciones de entorno
├── README.md                       # Documentación principal
├── TECHNICAL_DOCUMENTATION.md     # Documentación técnica
└── DEVELOPMENT_GUIDE.md           # Esta guía
```

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
ng serve

# Iniciar con puerto específico
ng serve --port 4300

# Iniciar con host específico
ng serve --host 0.0.0.0

# Abrir automáticamente en el navegador
ng serve --open
```

### Generación de Código
```bash
# Generar componente
ng generate component feature/component-name

# Generar servicio
ng generate service feature/service-name

# Generar modelo/clase
ng generate class feature/model-name

# Generar interfaz
ng generate interface feature/interface-name
```

### Testing
```bash
# Ejecutar pruebas unitarias
ng test

# Ejecutar pruebas con cobertura
ng test --code-coverage

# Ejecutar pruebas en modo watch
ng test --watch

# Ejecutar pruebas e2e
ng e2e
```

### Build
```bash
# Build de desarrollo
ng build

# Build de producción
ng build --configuration production

# Build con análisis de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/learning-center/stats.json
```

## 🎯 Flujos de Trabajo

### Agregar Nueva Funcionalidad

1. **Crear rama de feature**
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Desarrollar la funcionalidad**
- Crear componentes necesarios
- Implementar servicios
- Agregar tests
- Actualizar documentación

3. **Testing**
```bash
ng test
ng build --configuration production
```

4. **Commit y Push**
```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

5. **Crear Pull Request**

### Agregar Nuevo Componente

1. **Generar componente**
```bash
ng generate component patients/components/new-component
```

2. **Implementar funcionalidad**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="new-component">
      <!-- Template content -->
    </div>
  `,
  styles: [`
    .new-component {
      /* Styles */
    }
  `]
})
export class NewComponentComponent {
  // Component logic
}
```

3. **Agregar tests**
```typescript
describe('NewComponentComponent', () => {
  let component: NewComponentComponent;
  let fixture: ComponentFixture<NewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewComponentComponent]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Agregar Nuevo Servicio

1. **Generar servicio**
```bash
ng generate service shared/services/new-service
```

2. **Implementar servicio**
```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService extends BaseService<EntityType> {
  constructor() {
    super();
    this.resourceEndpoint = '/new-endpoint';
  }

  // Métodos específicos del servicio
  getSpecificData(): Observable<EntityType[]> {
    return of([]);
  }
}
```

## 🔧 Configuración

### Configuración de Entornos

#### development.ts
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableLogging: true,
  mockData: true
};
```

#### production.ts
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.medical-system.com',
  enableLogging: false,
  mockData: false
};
```

### Configuración de Proxy (Para API Backend)

Crear `proxy.conf.json`:
```json
{
  "/api/*": {
    "target": "http://localhost:3000",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Usar con:
```bash
ng serve --proxy-config proxy.conf.json
```

## 🎨 Estándares de Código

### Nomenclatura

- **Componentes**: `PascalCase` (ej: `PatientDashboardComponent`)
- **Servicios**: `PascalCase` con sufijo `Service` (ej: `AppointmentService`)
- **Interfaces**: `PascalCase` (ej: `Appointment`)
- **Propiedades**: `camelCase` (ej: `patientName`)
- **Métodos**: `camelCase` (ej: `getPatientById`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `MAX_APPOINTMENTS`)

### Estructura de Componentes

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, OnDestroy {
  // 1. Propiedades públicas
  title = 'Example Component';
  
  // 2. Propiedades privadas
  private subscription = new Subscription();
  
  // 3. Constructor
  constructor(
    private service: ExampleService,
    private router: Router
  ) {}
  
  // 4. Lifecycle hooks
  ngOnInit(): void {
    this.loadData();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // 5. Métodos públicos
  onButtonClick(): void {
    // Logic
  }
  
  // 6. Métodos privados
  private loadData(): void {
    // Logic
  }
}
```

### Manejo de Observables

```typescript
// ✅ Correcto - Unsubscribe en OnDestroy
export class ExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// ✅ Alternativa - Async pipe en template
@Component({
  template: `
    <div *ngFor="let item of items$ | async">
      {{ item.name }}
    </div>
  `
})
export class ExampleComponent {
  items$ = this.service.getItems();
}
```

## 🧪 Testing

### Configuración de Tests

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;
  let mockService: jasmine.SpyObj<ServiceName>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ServiceName', ['method1', 'method2']);

    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [
        { provide: ServiceName, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    mockService = TestBed.inject(ServiceName) as jasmine.SpyObj<ServiceName>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Test de Servicios

```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceName]
    });
    
    service = TestBed.inject(ServiceName);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data', () => {
    const mockData = [{ id: 1, name: 'Test' }];

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

## 📊 Debugging

### Chrome DevTools

1. **Elementos**: Inspeccionar DOM y estilos
2. **Console**: Ver logs y errores
3. **Sources**: Debuggear TypeScript
4. **Network**: Monitorear peticiones HTTP
5. **Application**: Revisar localStorage/sessionStorage

### Angular DevTools

1. **Instalar extensión** de Chrome/Firefox
2. **Inspeccionar componentes** y su estado
3. **Profiler** para performance
4. **Dependency injection** tree

### Debugging Tips

```typescript
// Console logs estratégicos
console.log('Component initialized:', this.data);
console.table(this.appointments); // Para arrays/objetos

// Breakpoints condicionales
if (this.appointments.length === 0) {
  debugger; // Solo se activa si no hay citas
}

// Error handling
.subscribe({
  next: (data) => console.log('Success:', data),
  error: (error) => console.error('Error:', error),
  complete: () => console.log('Observable completed')
});
```

## 🚀 Despliegue

### Build de Producción

```bash
# Build optimizado
ng build --configuration production

# Verificar tamaño del bundle
npx bundlesize

# Análisis del bundle
npx webpack-bundle-analyzer dist/learning-center/stats.json
```

### Optimizaciones

1. **Lazy Loading**: Cargar módulos bajo demanda
2. **OnPush**: Change detection optimizada
3. **TrackBy**: Optimizar *ngFor
4. **Preloading**: Precargar rutas
5. **Service Workers**: PWA capabilities

## 📈 Monitoreo

### Métricas Importantes

- **Time to First Byte (TTFB)**
- **First Contentful Paint (FCP)**
- **Largest Contentful Paint (LCP)**
- **Cumulative Layout Shift (CLS)**
- **First Input Delay (FID)**

### Herramientas

- **Lighthouse**: Auditoría de performance
- **Angular DevTools**: Profiling
- **Chrome DevTools**: Performance tab
- **Bundle Analyzer**: Análisis de tamaño

## 🔄 Versionado

### Semantic Versioning

- **MAJOR**: Cambios incompatibles
- **MINOR**: Nueva funcionalidad compatible
- **PATCH**: Correcciones de bugs

### Conventional Commits

```bash
feat: agregar calendario de citas
fix: corregir error en login
docs: actualizar README
style: formatear código
refactor: reorganizar servicios
test: agregar tests para appointment service
chore: actualizar dependencias
```

## 🤝 Contribución

### Proceso de Contribución

1. **Fork** del repositorio
2. **Crear rama** de feature
3. **Desarrollar** funcionalidad
4. **Escribir tests**
5. **Documentar** cambios
6. **Crear PR** con descripción detallada

### Code Review Checklist

- [ ] Código sigue estándares del proyecto
- [ ] Tests agregados y pasando
- [ ] Documentación actualizada
- [ ] No hay warnings de linting
- [ ] Performance considerada
- [ ] Accesibilidad verificada

---

**¡Happy Coding! 🎉** 
