import { Component, OnInit } from '@angular/core';
import { MoodService } from '../mood.service';

interface Mood {
  icon: string;
  label: string;
  value: number;
}

@Component({
  selector: 'app-mood-tracker',
  standalone: true,
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.scss'],
  imports: []
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

  constructor(private moodService: MoodService) {}

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
}
