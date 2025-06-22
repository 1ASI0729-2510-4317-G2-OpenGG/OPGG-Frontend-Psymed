import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';

interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: Date;
  nextAppointment: Date | null;
  status: string;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <div class="patient-list-container">
      <div class="header">
        <h1>My Patients</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          Add New Patient
        </button>
      </div>

      <mat-form-field class="search-field">
        <mat-label>Search Patients</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Name, ID, or Status" #input>
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
            <td mat-cell *matCellDef="let row"> {{row.name}} </td>
          </ng-container>

          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Age </th>
            <td mat-cell *matCellDef="let row"> {{row.age}} </td>
          </ng-container>

          <ng-container matColumnDef="lastVisit">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Visit </th>
            <td mat-cell *matCellDef="let row"> {{row.lastVisit | date}} </td>
          </ng-container>

          <ng-container matColumnDef="nextAppointment">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Next Appointment </th>
            <td mat-cell *matCellDef="let row"> {{row.nextAppointment | date}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
            <td mat-cell *matCellDef="let row">
              <span [class]="'status-badge ' + row.status.toLowerCase()">
                {{row.status}}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let row">
              <button mat-icon-button [routerLink]="['/doctor-dashboard/patients', row.id]">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button color="primary" (click)="scheduleAppointment(row)">
                <mat-icon>event</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="6">No patients found matching: "{{input.value}}"</td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of patients"></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .patient-list-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }

    .active {
      background-color: #E8F5E9;
      color: #2E7D32;
    }

    .inactive {
      background-color: #FFEBEE;
      color: #C62828;
    }

    .pending {
      background-color: #FFF3E0;
      color: #EF6C00;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'lastVisit', 'nextAppointment', 'status', 'actions'];
  dataSource: any; // TODO: Implement proper MatTableDataSource

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPatients() {
    // TODO: Implement actual data loading from PatientService
    const mockData: Patient[] = [
      {
        id: 1,
        name: 'John Doe',
        age: 35,
        lastVisit: new Date('2024-02-15'),
        nextAppointment: new Date('2024-03-15'),
        status: 'Active'
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 28,
        lastVisit: new Date('2024-02-10'),
        nextAppointment: null,
        status: 'Inactive'
      }
    ];
    this.dataSource = mockData;
  }

  scheduleAppointment(patient: Patient) {
    // TODO: Implement appointment scheduling
    console.log('Schedule appointment for patient:', patient);
  }
}
