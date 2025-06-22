import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PatientService } from '../../core/services/patient.service';

interface PatientDetail {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: {
    date: Date;
    description: string;
    type: string;
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate?: Date;
  }[];
  appointments: {
    date: Date;
    status: string;
    notes?: string;
  }[];
  moodHistory: {
    date: Date;
    mood: string;
    notes?: string;
  }[];
}

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  template: `
    <div class="patient-detail-container">
      <mat-card class="patient-header">
        <div class="patient-basic-info">
          <h1>{{ patient?.name }}</h1>
          <div class="patient-metadata">
            <span>{{ patient?.age }} years old</span>
            <span>{{ patient?.gender }}</span>
            <span>ID: {{ patient?.id }}</span>
          </div>
        </div>
        <div class="action-buttons">
          <button mat-raised-button color="primary">
            <mat-icon>edit</mat-icon>
            Edit Patient
          </button>
          <button mat-raised-button color="accent">
            <mat-icon>event</mat-icon>
            Schedule Appointment
          </button>
        </div>
      </mat-card>

      <mat-tab-group>
        <mat-tab label="Overview">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Contact Information</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="info-grid">
                  <div class="info-item">
                    <mat-icon>email</mat-icon>
                    <span>{{ patient?.email }}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>phone</mat-icon>
                    <span>{{ patient?.phone }}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>home</mat-icon>
                    <span>{{ patient?.address }}</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title>Emergency Contact</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="info-grid">
                  <div class="info-item">
                    <mat-icon>person</mat-icon>
                    <span>{{ patient?.emergencyContact?.name }}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>phone</mat-icon>
                    <span>{{ patient?.emergencyContact?.phone }}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>family_restroom</mat-icon>
                    <span>{{ patient?.emergencyContact?.relationship }}</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Medical History">
          <div class="tab-content">
            <mat-card>
              <mat-list>
                <mat-list-item *ngFor="let record of patient?.medicalHistory">
                  <div class="history-item">
                    <div class="history-date">{{ record.date | date }}</div>
                    <div class="history-type">{{ record.type }}</div>
                    <div class="history-description">{{ record.description }}</div>
                  </div>
                </mat-list-item>
              </mat-list>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Medications">
          <div class="tab-content">
            <mat-card>
              <mat-list>
                <mat-list-item *ngFor="let med of patient?.medications">
                  <div class="medication-item">
                    <div class="med-name">{{ med.name }}</div>
                    <div class="med-details">
                      {{ med.dosage }} - {{ med.frequency }}
                    </div>
                    <div class="med-dates">
                      From: {{ med.startDate | date }}
                      <span *ngIf="med.endDate">To: {{ med.endDate | date }}</span>
                    </div>
                  </div>
                </mat-list-item>
              </mat-list>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Mood History">
          <div class="tab-content">
            <mat-card>
              <mat-list>
                <mat-list-item *ngFor="let mood of patient?.moodHistory">
                  <div class="mood-item">
                    <div class="mood-date">{{ mood.date | date }}</div>
                    <div class="mood-status">{{ mood.mood }}</div>
                    <div class="mood-notes" *ngIf="mood.notes">{{ mood.notes }}</div>
                  </div>
                </mat-list-item>
              </mat-list>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .patient-detail-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .patient-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 20px;
    }

    .patient-basic-info h1 {
      margin: 0;
      color: #333;
    }

    .patient-metadata {
      display: flex;
      gap: 20px;
      color: #666;
      margin-top: 8px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .tab-content {
      padding: 20px 0;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 16px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .info-item mat-icon {
      color: #666;
    }

    .history-item, .medication-item, .mood-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    .history-date, .med-dates, .mood-date {
      color: #666;
      font-size: 0.9rem;
    }

    .history-type, .med-name, .mood-status {
      color: #333;
      font-weight: 500;
    }

    .history-description, .med-details, .mood-notes {
      color: #444;
    }

    mat-card {
      margin-bottom: 20px;
    }

    mat-list-item {
      height: auto !important;
      margin-bottom: 8px;
    }
  `]
})
export class PatientDetailComponent implements OnInit {
  patient: PatientDetail | null = null;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadPatientDetails(params['id']);
      }
    });
  }

  private loadPatientDetails(id: number) {
    // TODO: Implement actual data loading from PatientService
    this.patient = {
      id: id,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, ST 12345',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1 (555) 987-6543',
        relationship: 'Spouse'
      },
      medicalHistory: [
        {
          date: new Date('2024-02-15'),
          type: 'Initial Consultation',
          description: 'Patient reported symptoms of anxiety and depression.'
        },
        {
          date: new Date('2024-02-01'),
          type: 'Follow-up',
          description: 'Medication adjustment, positive response to treatment.'
        }
      ],
      medications: [
        {
          name: 'Sertraline',
          dosage: '50mg',
          frequency: 'Once daily',
          startDate: new Date('2024-02-15')
        }
      ],
      appointments: [
        {
          date: new Date('2024-03-15'),
          status: 'Scheduled',
          notes: 'Follow-up appointment'
        }
      ],
      moodHistory: [
        {
          date: new Date('2024-02-15'),
          mood: 'Anxious',
          notes: 'Feeling overwhelmed at work'
        },
        {
          date: new Date('2024-02-22'),
          mood: 'Improved',
          notes: 'Started new medication, feeling more stable'
        }
      ]
    };
  }
}
