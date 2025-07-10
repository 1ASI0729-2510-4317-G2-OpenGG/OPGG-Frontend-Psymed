import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient.entity';

@Component({
  selector: 'app-patient-create-and-edit',
  templateUrl: './patient-create-and-edit.component.html',
  styleUrls: ['./patient-create-and-edit.component.css']
})
export class PatientCreateAndEditComponent implements OnInit {
  patientForm: FormGroup;
  isEditMode = false;
  patient: Patient = new Patient({});

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthDate: ['', [Validators.required]],
      medicalHistory: [''],
      emergencyContact: ['', [Validators.required]],
      emergencyPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {
    // Initialize form with patient data if editing
    if (this.isEditMode) {
      this.patientForm.patchValue(this.patient);
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;

      if (this.isEditMode) {
        // Update existing patient
        console.log('Updating patient:', formData);
      } else {
        // Create new patient
        console.log('Creating patient:', formData);
      }
    }
  }

  onCancel(): void {
    // Logic to cancel and go back
    console.log('Form cancelled');
  }
}
