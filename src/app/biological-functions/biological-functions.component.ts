import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { BiologicalFunctionsService } from './biological-functions.service';
import { forkJoin, switchMap } from 'rxjs'
@Component({
  selector: 'app-biological-functions',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './biological-functions.component.html',
  styleUrls: ['./biological-functions.component.css']
})
export class BiologicalFunctionsComponent implements OnInit {
  functions = [
    { name: 'hunger', label: 'biologicalFunctions.hunger', icon: '🍔', value: 5 },
    { name: 'sleep', label: 'biologicalFunctions.sleep', icon: '😴', value: 5 },
    { name: 'energy', label: 'biologicalFunctions.energy', icon: '⚡', value: 5 },
    { name: 'hydration', label: 'biologicalFunctions.hydration', icon: '💧', value: 5 }
  ];

  history: any[] = [];

  constructor(private biologicalFunctionsService: BiologicalFunctionsService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.biologicalFunctionsService.getAll().subscribe({
      next: (data) => {
        this.history = data;
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
      }
    });
  }

  save() {
    const data = {
      date: new Date().toISOString(),
      hunger: this.functions.find(f => f.name === 'hunger')?.value,
      sleep: this.functions.find(f => f.name === 'sleep')?.value,
      energy: this.functions.find(f => f.name === 'energy')?.value,
      hydration: this.functions.find(f => f.name === 'hydration')?.value
    };

    this.biologicalFunctionsService.save(data).subscribe({
      next: () => {
        console.log('Datos guardados en db.json');
        this.loadHistory();  // Recarga el historial para mostrar lo nuevo
      },
      error: (err) => {
        console.error('Error al guardar:', err);
      }
    });
  }
  clearHistory() {
    this.biologicalFunctionsService.deleteAll().subscribe(() => {
      console.log('Historial borrado');
      this.loadHistory();
    });
  }
}
