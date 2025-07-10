import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prescription, Medication } from '../model/prescription.entity';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends BaseService<Prescription> {

  constructor() {
    super();
    this.resourceEndpoint = '/prescriptions';
  }

  // Datos de prueba
  private mockPrescriptions: Prescription[] = [
    new Prescription({
      id: 1,
      patientId: 1,
      medicId: 1,
      appointmentId: 1,
      patientName: 'Ana López',
      medicName: 'Dr. Juan Pérez',
      medications: [
        new Medication({
          name: 'Losartán',
          dosage: '50mg',
          frequency: '1 vez al día',
          duration: '30 días',
          instructions: 'Tomar con el desayuno'
        }),
        new Medication({
          name: 'Aspirina',
          dosage: '100mg',
          frequency: '1 vez al día',
          duration: '30 días',
          instructions: 'Tomar después de la cena'
        })
      ],
      instructions: 'Mantener dieta baja en sodio. Control de presión arterial semanal.',
      diagnosis: 'Hipertensión arterial controlada',
      date: '2024-01-15'
    }),
    new Prescription({
      id: 2,
      patientId: 2,
      medicId: 1,
      appointmentId: 2,
      patientName: 'Luis Martínez',
      medicName: 'Dr. Juan Pérez',
      medications: [
        new Medication({
          name: 'Omeprazol',
          dosage: '20mg',
          frequency: '1 vez al día',
          duration: '14 días',
          instructions: 'Tomar 30 minutos antes del desayuno'
        })
      ],
      instructions: 'Evitar alimentos irritantes. Comidas pequeñas y frecuentes.',
      diagnosis: 'Gastritis aguda',
      date: '2024-01-15'
    }),
    new Prescription({
      id: 3,
      patientId: 3,
      medicId: 2,
      appointmentId: 3,
      patientName: 'Sofia Hernández',
      medicName: 'Dra. María García',
      medications: [
        new Medication({
          name: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Cada 6 horas',
          duration: '3 días',
          instructions: 'Solo si hay fiebre o dolor'
        }),
        new Medication({
          name: 'Jarabe para la tos',
          dosage: '5ml',
          frequency: 'Cada 8 horas',
          duration: '7 días',
          instructions: 'Tomar después de las comidas'
        })
      ],
      instructions: 'Reposo relativo. Abundantes líquidos. Consultar si persiste la fiebre.',
      diagnosis: 'Infección respiratoria viral',
      date: '2024-01-15'
    })
  ];

  // Obtener todas las prescripciones
  getAllPrescriptions(): Observable<Prescription[]> {
    return of(this.mockPrescriptions);
  }

  // Obtener prescripciones por paciente
  getPrescriptionsByPatient(patientId: number): Observable<Prescription[]> {
    const patientPrescriptions = this.mockPrescriptions.filter(
      prescription => prescription.patientId === patientId
    );
    return of(patientPrescriptions);
  }

  // Obtener prescripciones por médico
  getPrescriptionsByMedic(medicId: number): Observable<Prescription[]> {
    const medicPrescriptions = this.mockPrescriptions.filter(
      prescription => prescription.medicId === medicId
    );
    return of(medicPrescriptions);
  }

  // Obtener prescripción por ID
  getPrescriptionById(id: number): Observable<Prescription | undefined> {
    const prescription = this.mockPrescriptions.find(p => p.id === id);
    return of(prescription);
  }

  // Crear nueva prescripción
  createPrescription(prescription: Prescription): Observable<Prescription> {
    const newId = Math.max(...this.mockPrescriptions.map(p => p.id)) + 1;
    prescription.id = newId;
    prescription.createdAt = new Date();
    prescription.updatedAt = new Date();

    this.mockPrescriptions.push(prescription);
    return of(prescription);
  }

  // Actualizar prescripción
  updatePrescription(id: number, prescriptionData: Partial<Prescription>): Observable<Prescription> {
    const index = this.mockPrescriptions.findIndex(p => p.id === id);
    if (index !== -1) {
      // Actualizar solo las propiedades básicas para evitar conflictos de tipos
      if (prescriptionData.diagnosis) {
        this.mockPrescriptions[index].diagnosis = prescriptionData.diagnosis;
      }
      if (prescriptionData.instructions) {
        this.mockPrescriptions[index].instructions = prescriptionData.instructions;
      }
      if (prescriptionData.medications) {
        this.mockPrescriptions[index].medications = prescriptionData.medications;
      }
      if (prescriptionData.date) {
        this.mockPrescriptions[index].date = prescriptionData.date;
      }
      this.mockPrescriptions[index].updatedAt = new Date();
      return of(this.mockPrescriptions[index]);
    }
    throw new Error('Prescripción no encontrada');
  }

  // Eliminar prescripción
  deletePrescription(id: number): Observable<boolean> {
    const index = this.mockPrescriptions.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPrescriptions.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Obtener medicamentos comunes para autocompletado
  getCommonMedications(): Observable<string[]> {
    const commonMeds = [
      'Paracetamol', 'Ibuprofeno', 'Aspirina', 'Omeprazol', 'Losartán',
      'Enalapril', 'Metformina', 'Atorvastatina', 'Amlodipino', 'Simvastatina',
      'Diclofenaco', 'Naproxeno', 'Amoxicilina', 'Azitromicina', 'Ciprofloxacino',
      'Loratadina', 'Cetirizina', 'Salbutamol', 'Prednisolona', 'Dexametasona'
    ];
    return of(commonMeds);
  }

  // Obtener frecuencias comunes
  getCommonFrequencies(): Observable<string[]> {
    const frequencies = [
      '1 vez al día',
      '2 veces al día',
      '3 veces al día',
      'Cada 4 horas',
      'Cada 6 horas',
      'Cada 8 horas',
      'Cada 12 horas',
      'Cada 24 horas',
      'Según necesidad'
    ];
    return of(frequencies);
  }

  // Obtener duraciones comunes
  getCommonDurations(): Observable<string[]> {
    const durations = [
      '3 días',
      '5 días',
      '7 días',
      '10 días',
      '14 días',
      '21 días',
      '30 días',
      '60 días',
      '90 días',
      'Indefinido'
    ];
    return of(durations);
  }
}
