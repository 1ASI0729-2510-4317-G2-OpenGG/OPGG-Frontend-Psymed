export class BiologicalAnalytic {
  idPatient: string;
  month: string;
  year: string;
  hungerAverage: string;
  sleepAverage: string;
  energyAverage: string;
  hydrationAverage: string;

    constructor(biologicalAnalytic: {idPatient: string, month?: string,
    year?: string, hungerAverage?: string, sleepAverage?: string,
    energyAverage?: string, hydrationAverage?: string}) {
    this.idPatient = biologicalAnalytic.idPatient;
    this.month = biologicalAnalytic.month || '0';
    this.year = biologicalAnalytic.year || '0';
    this.hungerAverage = biologicalAnalytic.hungerAverage || '0';
    this.sleepAverage = biologicalAnalytic.sleepAverage || '0';
    this.energyAverage = biologicalAnalytic.energyAverage || '0';
    this.hydrationAverage = biologicalAnalytic.hydrationAverage || '0';
  }
}
