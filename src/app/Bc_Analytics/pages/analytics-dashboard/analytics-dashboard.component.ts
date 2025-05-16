import {Component, OnInit} from '@angular/core';
import {PieChartComponent} from "../../components/pie-chart/pie-chart.component";
import {PieFilterComponent} from "../../components/pie-filter/pie-filter.component";
import {ActivatedRoute} from "@angular/router";
import {BarChartComponent} from "../../components/bar-chart/bar-chart.component";
import {MoodAnalytic} from '../../model/mood-analytic';
import {BiologicalAnalytic} from '../../model/biological-analytic';
import {MoodAnalyticService} from '../../service/mood-analytic.service';
import {BiologicalAnalyticService} from '../../service/biological-analytic.service';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    PieChartComponent,
    PieFilterComponent,
    BarChartComponent,

  ],
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.css'
})
export class AnalyticsDashboardComponent implements OnInit{
  // #region Attributes
  protected moodAnalyticData!: MoodAnalytic;
  protected biologicalAnalyticData!: BiologicalAnalytic;
  private patientId!: string;

  constructor(private moodAnalyticService: MoodAnalyticService,
              private route: ActivatedRoute,
              private biologicalAnalyticService: BiologicalAnalyticService) {
  }

  onFilterRequested(date: {month: any, year: any}){
    this.getMoodAnalyticDataByDate(date.month, date.year)
    this.getBiologicalAnalyticDataByDate(date.month, date.year)
  }

  getMoodAnalyticDataByDate(month: string, year: string) {
    this.moodAnalyticService.findByDateAndPatientId(month, year, this.patientId).subscribe((response: MoodAnalytic | null) => {
      if(response){
        this.moodAnalyticData = response;
      }
      else {
        console.log('No data found')
      }
      console.log('El response', response)
    })
  }


  getBiologicalAnalyticDataByDate(month: string, year: string){
    this.biologicalAnalyticService.findByDateAndPatientId(month, year, this.patientId)
      .subscribe((response: BiologicalAnalytic | null) => {
        if(response) {
          this.biologicalAnalyticData = response;
        }
        else {
          console.log("No data found")
        }
        console.log("El response", response)
      })
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.getMoodAnalyticDataByDate('0', '0')
    this.getBiologicalAnalyticDataByDate('0', '0')
    console.log("Start")
  }

}
