# Sistema de Citas Médicas 🏥

Sistema integral de gestión de citas médicas desarrollado con Angular 19, que permite la interacción entre pacientes, médicos y administradores para la gestión eficiente de consultas médicas.

## 🚀 Características Principales

### Para Pacientes 👤
- **Dashboard personalizado** con calendario de citas
- **Reserva de citas** con selección de médico y horario
- **Historial de citas** con estado y detalles
- **Perfil personal** con información médica
- **Visualización de prescripciones** recibidas

### Para Médicos 👨‍⚕️
- **Agenda médica** con calendario interactivo
- **Gestión de pacientes** asignados
- **Sistema de prescripciones** con medicamentos y dosificaciones
- **Perfil profesional** con especialización y experiencia
- **Disponibilidad configurable** por días y horarios

### Para Administradores 👩‍💼
- **Gestión completa de usuarios** (pacientes y médicos)
- **Supervisión de citas** del sistema
- **Reportes y estadísticas** de la plataforma
- **Configuración del sistema**

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura de **Bounded Contexts** con separación clara de responsabilidades:

```
src/app/
├── iam/                    # Autenticación y autorización
│   ├── pages/login/        # Página de inicio de sesión
│   └── services/           # Servicios de autenticación
├── patients/               # Contexto de pacientes
│   ├── pages/              # Páginas específicas de pacientes
│   ├── components/         # Componentes reutilizables
│   ├── model/              # Entidades y modelos
│   └── services/           # Lógica de negocio
├── medics/                 # Contexto de médicos
│   ├── pages/              # Páginas específicas de médicos
│   ├── components/         # Componentes reutilizables
│   ├── model/              # Entidades y modelos
│   └── services/           # Lógica de negocio
└── shared/                 # Recursos compartidos
    ├── components/         # Componentes reutilizables
    ├── model/              # Entidades base
    └── services/           # Servicios compartidos
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- Angular CLI (v19.2.10)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd learning-center
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
ng serve
```

4. **Acceder a la aplicación**
Navegar a `http://localhost:4200/`

## 👥 Usuarios de Prueba

Para probar el sistema, utiliza las siguientes credenciales:

### Paciente
- **Email:** `patient@test.com`
- **Contraseña:** `123456`
- **Funcionalidades:** Reservar citas, ver historial, gestionar perfil

### Médico
- **Email:** `medico@test.com`
- **Contraseña:** `123456`
- **Funcionalidades:** Gestionar agenda, atender pacientes, crear prescripciones

### Administrador
- **Email:** `admin@test.com`
- **Contraseña:** `123456`
- **Funcionalidades:** Gestión completa del sistema

## 📱 Funcionalidades Detalladas

### 🗓️ Sistema de Calendario
- **Calendario interactivo** con visualización mensual
- **Indicadores de disponibilidad** para médicos
- **Estados de citas** (pendiente, confirmada, completada, cancelada)
- **Navegación intuitiva** entre meses
- **Eventos clickeables** para ver detalles

### 💊 Sistema de Prescripciones
- **Creación de recetas** con múltiples medicamentos
- **Dosificaciones específicas** y frecuencias
- **Instrucciones detalladas** para el paciente
- **Historial de prescripciones** por paciente
- **Estados de prescripciones** (activa, completada, cancelada)

### 📋 Gestión de Citas
- **Reserva inteligente** con disponibilidad en tiempo real
- **Confirmación automática** o manual
- **Notificaciones** de estado
- **Reprogramación** de citas
- **Historial completo** de consultas

### 👤 Perfiles de Usuario
- **Información personal** y médica
- **Foto de perfil** personalizable
- **Especialidades médicas** (para médicos)
- **Experiencia profesional** y calificaciones
- **Idiomas** y certificaciones

## 🔒 Seguridad y Autenticación

- **Autenticación basada en roles** (Paciente, Médico, Administrador)
- **Rutas protegidas** según permisos
- **Sesiones seguras** con tokens
- **Validación de formularios** en cliente y servidor
- **Protección CSRF** y sanitización de datos

## 🎨 Diseño y UX

- **Diseño responsive** para todos los dispositivos
- **Interfaz intuitiva** y accesible
- **Colores diferenciados** por tipo de usuario
- **Feedback visual** para todas las acciones
- **Animaciones suaves** y transiciones

## 📊 Estructura de Datos

### Entidades Principales

#### Paciente
```typescript
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  medicalHistory: string[];
  allergies: string[];
  profilePhoto?: string;
}
```

#### Médico
```typescript
interface Medic {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  yearsOfExperience: number;
  education: string[];
  languages: string[];
  availability: WeeklyAvailability;
  schedules: WeeklySchedule;
}
```

#### Cita
```typescript
interface Appointment {
  id: number;
  patientId: number;
  medicId: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  reason: string;
  notes: string;
  patientName: string;
  medicName: string;
  specialty: string;
}
```

#### Prescripción
```typescript
interface Prescription {
  id: number;
  patientId: number;
  medicId: number;
  appointmentId: number;
  medications: Medication[];
  instructions: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  expiresAt: Date;
}
```

## 🧪 Testing

### Ejecutar pruebas unitarias
```bash
ng test
```

### Ejecutar pruebas e2e
```bash
ng e2e
```

### Cobertura de código
```bash
ng test --code-coverage
```

## 🚀 Despliegue

### Construcción para producción
```bash
ng build --configuration production
```

### Optimizaciones incluidas
- **Tree shaking** para reducir el bundle
- **Lazy loading** de módulos
- **Minificación** de código
- **Compresión** de assets
- **Service workers** para PWA

## 📚 Documentación Técnica

### Servicios Principales

#### AppointmentService
Gestiona todas las operaciones relacionadas con citas médicas:
- `getAllAppointments()`: Obtiene todas las citas
- `getAppointmentsByPatient(patientId)`: Citas de un paciente específico
- `getAppointmentsByMedic(medicId)`: Citas de un médico específico
- `createAppointment(appointment)`: Crea nueva cita
- `updateAppointment(id, data)`: Actualiza cita existente
- `cancelAppointment(id)`: Cancela una cita

#### PrescriptionService
Maneja el sistema de prescripciones médicas:
- `createPrescription(prescription)`: Crea nueva prescripción
- `getPrescriptionsByPatient(patientId)`: Prescripciones de un paciente
- `updatePrescription(id, data)`: Actualiza prescripción
- `addMedication(prescriptionId, medication)`: Añade medicamento

#### CalendarComponent
Componente reutilizable para visualización de calendarios:
- **Inputs:** `appointments`, `availability`, `userType`
- **Outputs:** `dayClicked`, `appointmentClicked`
- **Características:** Navegación mensual, estados visuales, responsive

## 🔄 Flujo de Trabajo

### Flujo de Reserva de Cita
1. **Paciente** inicia sesión en el sistema
2. **Selecciona** "Reservar Cita" en el menú
3. **Elige** especialidad y médico
4. **Selecciona** fecha y hora disponible
5. **Completa** formulario con motivo de consulta
6. **Confirma** la reserva
7. **Médico** recibe notificación
8. **Cita** aparece en ambos calendarios

### Flujo de Consulta Médica
1. **Médico** ve la cita en su agenda
2. **Confirma** la cita si es necesario
3. **Realiza** la consulta
4. **Crea** prescripción si es necesaria
5. **Completa** la cita con notas
6. **Paciente** recibe prescripción y resumen

## 🤝 Contribución

Para contribuir al proyecto:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Crea** un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para reportar bugs o solicitar nuevas funcionalidades:
- **Issues:** Utiliza el sistema de issues de GitHub
- **Documentación:** Consulta este README y los comentarios en el código
- **Contacto:** [Información de contacto del equipo]

## 📈 Roadmap

### Próximas funcionalidades
- [ ] **Notificaciones push** para recordatorios
- [ ] **Videollamadas** integradas para teleconsultas
- [ ] **Historial médico** completo con archivos
- [ ] **Reportes** y analytics avanzados
- [ ] **Integración** con sistemas externos de salud
- [ ] **App móvil** nativa
- [ ] **Pagos** en línea para consultas

---

**Desarrollado con ❤️ usando Angular 19**
