import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient.entity';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css']
})
export class PatientManagementComponent implements OnInit {
  patients: Patient[] = [];
  isLoading = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    // Simular carga de datos
    setTimeout(() => {
      this.patients = [
        new Patient({
          id: 1,
          firstName: 'Ana',
          lastName: 'López',
          email: 'ana.lopez@email.com',
          phone: '555-1001',
          birthDate: new Date('1990-05-15'),
          medicalHistory: 'Hipertensión controlada',
          emergencyContact: 'Pedro López',
          emergencyPhone: '555-1002'
        }),
        new Patient({
          id: 2,
          firstName: 'Luis',
          lastName: 'Martínez',
          email: 'luis.martinez@email.com',
          phone: '555-1003',
          birthDate: new Date('1985-08-22'),
          medicalHistory: 'Diabetes tipo 2',
          emergencyContact: 'Carmen Martínez',
          emergencyPhone: '555-1004'
        }),
        new Patient({
          id: 3,
          firstName: 'Sofia',
          lastName: 'Hernández',
          email: 'sofia.hernandez@email.com',
          phone: '555-1005',
          birthDate: new Date('1992-12-10'),
          medicalHistory: 'Sin antecedentes relevantes',
          emergencyContact: 'Miguel Hernández',
          emergencyPhone: '555-1006'
        })
      ];
      this.isLoading = false;
    }, 1000);
  }

  onCreatePatient(): void {
    // Logic to create new patient
    console.log('Create new patient');
  }

  onEditPatient(patient: Patient): void {
    // Logic to edit patient
    console.log('Edit patient:', patient);
  }

  onDeletePatient(patient: Patient): void {
    // Logic to delete patient
    console.log('Delete patient:', patient);
  }
}
