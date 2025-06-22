import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { ChartData, ChartType } from "chart.js";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {BiologicalAnalytic} from '../../model/biological-analytic';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCard,
    MatCardTitle,
    MatCardContent,
    TranslateModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges, OnInit {
  // #region Attributes
  @Input() biologicalAnalytic!: BiologicalAnalytic;
  protected barChartLabels: Array<string> = ['hunger', 'sleep', 'energy', 'hydration'];
  barChartData!: ChartData<ChartType, Array<string>, string>;


  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxRotation: 0,
          autoSkip: true,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.1,
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  constructor(private translateService: TranslateService) {}

   private initialData() {
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: ['0', '0', '0', '0'],
          label: 'Month average',
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderWidth: 1
        }
      ]
    };
  }

   private updateChart() {
    let monthAverageLabel;
    this.translateService.get("pages.patient-management.actions.dashboard-analytics-month-average")
      .subscribe((text: string) => {
        monthAverageLabel = text;
      });

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [
            this.biologicalAnalytic.hungerAverage,
            this.biologicalAnalytic.sleepAverage,
            this.biologicalAnalytic.energyAverage,
            this.biologicalAnalytic.hydrationAverage
          ],
          label: monthAverageLabel,
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderColor: ['purple', '#36A2EB', 'grey', 'blue'],
          borderWidth: 1,
          barThickness: 'flex',
          maxBarThickness: 50,
          minBarLength: 2
        }
      ]
    };
  }

    ngOnChanges(changes: SimpleChanges): void {
    if (changes['biologicalAnalytic']) {
      this.updateChart();
    }
  }

   ngOnInit(): void {
    this.initialData();
  }
}
