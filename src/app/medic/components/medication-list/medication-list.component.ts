import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../model/medications.entity';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [CommonModule, NgFor, MatCardModule, TranslateModule, RouterLink, MatButton, MatIcon],
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];

  loading = true;
  error = false;

  constructor(private medicationService: MedicationService) {}

  ngOnInit() {
    this.medicationService.getAllMedications().subscribe({
      next: (data) => {
        this.medications = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}


