import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { ProfessionalService } from '../../core/services/professional.service';

interface DoctorSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    desktop: boolean;
  };
  availability: {
    workingDays: string[];
    workingHours: {
      start: string;
      end: string;
    };
    appointmentDuration: number;
    breakTime: number;
  };
  preferences: {
    language: string;
    theme: string;
    timeZone: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  template: `
    <div class="settings-container">
      <h1>Settings</h1>

      <form [formGroup]="settingsForm" (ngSubmit)="saveSettings()">
        <mat-card class="settings-section">
          <mat-card-header>
            <mat-card-title>Notifications</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group" formGroupName="notifications">
              <mat-slide-toggle formControlName="email">
                Email Notifications
              </mat-slide-toggle>
              <mat-slide-toggle formControlName="sms">
                SMS Notifications
              </mat-slide-toggle>
              <mat-slide-toggle formControlName="desktop">
                Desktop Notifications
              </mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-section">
          <mat-card-header>
            <mat-card-title>Availability</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group" formGroupName="availability">
              <mat-form-field>
                <mat-label>Working Days</mat-label>
                <mat-select formControlName="workingDays" multiple>
                  <mat-option value="monday">Monday</mat-option>
                  <mat-option value="tuesday">Tuesday</mat-option>
                  <mat-option value="wednesday">Wednesday</mat-option>
                  <mat-option value="thursday">Thursday</mat-option>
                  <mat-option value="friday">Friday</mat-option>
                  <mat-option value="saturday">Saturday</mat-option>
                  <mat-option value="sunday">Sunday</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="working-hours">
                <mat-form-field>
                  <mat-label>Start Time</mat-label>
                  <input matInput type="time" formControlName="workingHoursStart">
                </mat-form-field>

                <mat-form-field>
                  <mat-label>End Time</mat-label>
                  <input matInput type="time" formControlName="workingHoursEnd">
                </mat-form-field>
              </div>

              <mat-form-field>
                <mat-label>Default Appointment Duration (minutes)</mat-label>
                <input matInput type="number" formControlName="appointmentDuration">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Break Time Between Appointments (minutes)</mat-label>
                <input matInput type="number" formControlName="breakTime">
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-section">
          <mat-card-header>
            <mat-card-title>Preferences</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group" formGroupName="preferences">
              <mat-form-field>
                <mat-label>Language</mat-label>
                <mat-select formControlName="language">
                  <mat-option value="en">English</mat-option>
                  <mat-option value="es">Spanish</mat-option>
                  <mat-option value="fr">French</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Theme</mat-label>
                <mat-select formControlName="theme">
                  <mat-option value="light">Light</mat-option>
                  <mat-option value="dark">Dark</mat-option>
                  <mat-option value="system">System Default</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Time Zone</mat-label>
                <mat-select formControlName="timeZone">
                  <mat-option value="UTC-5">Eastern Time (UTC-5)</mat-option>
                  <mat-option value="UTC-6">Central Time (UTC-6)</mat-option>
                  <mat-option value="UTC-7">Mountain Time (UTC-7)</mat-option>
                  <mat-option value="UTC-8">Pacific Time (UTC-8)</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="settings-section">
          <mat-card-header>
            <mat-card-title>Security</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group" formGroupName="security">
              <mat-slide-toggle formControlName="twoFactorAuth">
                Enable Two-Factor Authentication
              </mat-slide-toggle>

              <mat-form-field>
                <mat-label>Session Timeout (minutes)</mat-label>
                <input matInput type="number" formControlName="sessionTimeout">
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="form-actions">
          <button mat-button type="button" (click)="resetForm()">Reset</button>
          <button mat-raised-button color="primary" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 24px;
      color: #333;
    }

    .settings-section {
      margin-bottom: 24px;
    }

    .settings-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }

    .working-hours {
      display: flex;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    mat-slide-toggle {
      margin: 8px 0;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private professionalService: ProfessionalService
  ) {
    this.settingsForm = this.fb.group({
      notifications: this.fb.group({
        email: [true],
        sms: [false],
        desktop: [true]
      }),
      availability: this.fb.group({
        workingDays: [['monday', 'tuesday', 'wednesday', 'thursday', 'friday']],
        workingHoursStart: ['09:00'],
        workingHoursEnd: ['17:00'],
        appointmentDuration: [60],
        breakTime: [15]
      }),
      preferences: this.fb.group({
        language: ['en'],
        theme: ['light'],
        timeZone: ['UTC-5']
      }),
      security: this.fb.group({
        twoFactorAuth: [false],
        sessionTimeout: [30]
      })
    });
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // TODO: Implement actual settings loading from ProfessionalService
    const mockSettings: DoctorSettings = {
      notifications: {
        email: true,
        sms: false,
        desktop: true
      },
      availability: {
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        workingHours: {
          start: '09:00',
          end: '17:00'
        },
        appointmentDuration: 60,
        breakTime: 15
      },
      preferences: {
        language: 'en',
        theme: 'light',
        timeZone: 'UTC-5'
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30
      }
    };

    this.settingsForm.patchValue({
      notifications: mockSettings.notifications,
      availability: {
        workingDays: mockSettings.availability.workingDays,
        workingHoursStart: mockSettings.availability.workingHours.start,
        workingHoursEnd: mockSettings.availability.workingHours.end,
        appointmentDuration: mockSettings.availability.appointmentDuration,
        breakTime: mockSettings.availability.breakTime
      },
      preferences: mockSettings.preferences,
      security: mockSettings.security
    });
  }

  saveSettings() {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      const settings: DoctorSettings = {
        notifications: formValue.notifications,
        availability: {
          workingDays: formValue.availability.workingDays,
          workingHours: {
            start: formValue.availability.workingHoursStart,
            end: formValue.availability.workingHoursEnd
          },
          appointmentDuration: formValue.availability.appointmentDuration,
          breakTime: formValue.availability.breakTime
        },
        preferences: formValue.preferences,
        security: formValue.security
      };

      // TODO: Implement actual settings saving
      console.log('Saving settings:', settings);
    }
  }

  resetForm() {
    this.loadSettings();
  }
}
