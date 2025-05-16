export class MoodAnalytic {
  idPatient: string;
  year: string;
  month: string;
  sadMood: string;
  happyMood: string;
  neutralMood: string;
  soSadMood: string;
  soHappyMood: string;

  constructor(moodAnalytic: {idPatient: string, year?: string, month?: string,
    sadMood?: string, happyMood?: string, neutralMood?: string,
    soSadMood?: string, soHappyMood?: string}) {
    this.idPatient =  moodAnalytic.idPatient;
    this.year = moodAnalytic.year || '0';
    this.month = moodAnalytic.month || '0';
    this.sadMood = moodAnalytic.sadMood || '0';
    this.happyMood = moodAnalytic.happyMood || '0';
    this.neutralMood = moodAnalytic.neutralMood || '0';
    this.soSadMood = moodAnalytic.soSadMood || '0';
    this.soHappyMood = moodAnalytic.soHappyMood || '0';
  }
}

