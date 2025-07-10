export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface DaySchedule {
  start: string;
  end: string;
}

export interface WeeklyAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  [key: string]: boolean;
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  [key: string]: DaySchedule;
}

export class Medic {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  yearsOfExperience: number;
  consultationFee: number;
  workingHours: string;
  hospital: string;
  description: string;
  profilePhoto: string;
  totalPatients: number;
  rating: number;
  education: Education[];
  additionalSpecialties: string[];
  languages: string[];
  availability: WeeklyAvailability;
  schedules: WeeklySchedule;
  isActive: boolean;

  constructor(medic: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    specialty?: string,
    licenseNumber?: string,
    yearsOfExperience?: number,
    consultationFee?: number,
    workingHours?: string,
    hospital?: string,
    description?: string,
    profilePhoto?: string,
    totalPatients?: number,
    rating?: number,
    education?: Education[],
    additionalSpecialties?: string[],
    languages?: string[],
    availability?: WeeklyAvailability,
    schedules?: WeeklySchedule,
    isActive?: boolean
  }) {
    this.id = medic.id || 0;
    this.firstName = medic.firstName || '';
    this.lastName = medic.lastName || '';
    this.email = medic.email || '';
    this.phone = medic.phone || '';
    this.specialty = medic.specialty || '';
    this.licenseNumber = medic.licenseNumber || '';
    this.yearsOfExperience = medic.yearsOfExperience || 0;
    this.consultationFee = medic.consultationFee || 0;
    this.workingHours = medic.workingHours || '';
    this.hospital = medic.hospital || '';
    this.description = medic.description || '';
    this.profilePhoto = medic.profilePhoto || '';
    this.totalPatients = medic.totalPatients || 0;
    this.rating = medic.rating || 0;
    this.education = medic.education || [];
    this.additionalSpecialties = medic.additionalSpecialties || [];
    this.languages = medic.languages || [];
    this.availability = medic.availability || {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    };
    this.schedules = medic.schedules || {
      monday: { start: '', end: '' },
      tuesday: { start: '', end: '' },
      wednesday: { start: '', end: '' },
      thursday: { start: '', end: '' },
      friday: { start: '', end: '' },
      saturday: { start: '', end: '' },
      sunday: { start: '', end: '' }
    };
    this.isActive = medic.isActive || true;
  }

  get fullName(): string {
    return `Dr. ${this.firstName} ${this.lastName}`.trim();
  }

  get experienceLevel(): string {
    if (this.yearsOfExperience < 2) return 'Junior';
    if (this.yearsOfExperience < 5) return 'Mid-level';
    if (this.yearsOfExperience < 10) return 'Senior';
    return 'Expert';
  }
}
