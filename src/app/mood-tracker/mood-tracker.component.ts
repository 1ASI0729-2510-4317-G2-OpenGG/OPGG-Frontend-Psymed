import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';
import { HttpClientModule } from '@angular/common/http'; // <-- Import correcto
import { CommonModule } from '@angular/common'; // <-- Import correcto
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Mood {
  icon: string;
  label: string;
  value: number;
}

@Component({
  selector: 'app-mood-tracker',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [MoodService],
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.css']
})
export class MoodTrackerComponent implements OnInit {

  moods: Mood[] = [
    { icon: '😭', label: 'Very Sad', value: 1 },
    { icon: '😢', label: 'Sad', value: 2 },
    { icon: '😐', label: 'Neutral', value: 3 },
    { icon: '😊', label: 'Happy', value: 4 },
    { icon: '😁', label: 'Very Happy', value: 5 }
  ];

  selectedMood: Mood | null = null;
  moodHistory: any[] = [];

  constructor(private moodService: MoodService,private translate:TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(['en', 'es'].includes(browserLang) ? browserLang : 'en');

  }

  ngOnInit() {
    this.loadMoodHistory();
  }

  selectMood(mood: Mood) {
    this.selectedMood = mood;
  }

  saveMood() {
    if (this.selectedMood) {
      const data = {
        mood: this.selectedMood,
        date: new Date().toISOString()
      };
      this.moodService.saveMood(data).subscribe(() => {
        console.log('Mood saved successfully.');
        this.loadMoodHistory();
      });
    }
  }

  loadMoodHistory() {
    this.moodService.getMoods().subscribe((data) => {
      this.moodHistory = data;
    });
  }
  clearMoodHistory() {
    this.moodService.deleteAll().subscribe(() => {
      console.log('Historial de estados de ánimo borrado');
      this.loadMoodHistory();
    });
  }
}
