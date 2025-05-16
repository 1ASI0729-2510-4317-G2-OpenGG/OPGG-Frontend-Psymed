import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartType, ChartOptions, ChartData} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MoodAnalytic} from '../../model/mood-analytic';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCard,
    MatCardTitle,
    MatCardContent,
    TranslateModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges, OnInit {
  @Input() moodAnalytics!: MoodAnalytic;
  pieChartData!: ChartData<ChartType, string[], string>
  pieChartLabels: string[] = ['Sad', 'Happy', 'Neutral', 'So Sad', 'So Happy'];

  public pieChartOptions: ChartOptions = {
    responsive: true
  };

  ngOnInit(): void {
    this.initialData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['moodAnalytics']){
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [this.moodAnalytics.soSadMood,
            this.moodAnalytics.sadMood,
            this.moodAnalytics.neutralMood,
            this.moodAnalytics.happyMood,
            this.moodAnalytics.soHappyMood
          ],
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue', '#FFCE56']
        }
      ]
    }
  }


  private initialData(): void {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: ['0',
            '0',
            '0',
            '0',
            '0'
          ],
          backgroundColor: ['purple', '#36A2EB', 'grey', 'blue', '#FFCE56']
        }
      ]
    }

  }
}
