import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login.component';
import { DoctorDashboardComponent } from './app/doctor-dashboard.component';
import { PatientDashboardComponent } from './app/patient-dashboard.component';

console.log('Iniciando aplicación SPYMED...');

// Definir las rutas
const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent },
  { path: 'patient/dashboard', component: PatientDashboardComponent },
  { path: '**', redirectTo: '' }
];

// Arrancar la aplicación con el componente principal
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation())
  ]
})
.then(() => {
  console.log('Aplicación SPYMED inicializada correctamente');
})
.catch((err) => {
  console.error('Error al inicializar la aplicación:', err);

  // Mostrar error en pantalla para facilitar diagnóstico
  const errorElement = document.createElement('div');
  errorElement.style.backgroundColor = '#ffebee';
  errorElement.style.color = '#b71c1c';
  errorElement.style.padding = '20px';
  errorElement.style.margin = '20px';
  errorElement.style.borderRadius = '5px';
  errorElement.style.fontFamily = 'Arial, sans-serif';

  errorElement.innerHTML = `
    <h2>Error al inicializar la aplicación</h2>
    <p>${err.toString()}</p>
    <pre>${err.stack || 'No stack trace disponible'}</pre>
  `;

  document.body.appendChild(errorElement);
});
