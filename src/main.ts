import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('Iniciando aplicación SPYMED...');

// Arrancar la aplicación con el componente principal
bootstrapApplication(AppComponent, appConfig)
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
