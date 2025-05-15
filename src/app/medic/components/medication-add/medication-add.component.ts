import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../model/medications.entity';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';


@Component({
  selector: 'app-add-medication',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatCardActions,
    MatCardContent,
    MatCard
  ],
  templateUrl: './medication-add.component.html',
  styleUrls: ['./medication-add.component.css']
})
export class AddMedicationComponent {
  newMedication: Medication = {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    interval: '',
    quantity: 0,
    status: '',
    patientId: '',
    dosage: '',
    sideEffects: []
  };

  medications: Medication[] = []; // ✅ Lista local para mostrar en el HTML

  constructor(private medicationService: MedicationService) {}

  addMedication() {
    this.medicationService.createMedication(this.newMedication).subscribe({
      next: () => {
        alert('Medicamento agregado exitosamente');

        // ✅ Agregar el medicamento a la lista local
        this.medications.push({ ...this.newMedication });

        // ✅ Limpiar el formulario
        this.newMedication = {
          id: '',
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          interval: '',
          quantity: 0,
          status: '',
          patientId: '',
          dosage: '',
          sideEffects: []
        };
      },
      error: () => alert('Error al agregar medicamento')
    });
  }
}
