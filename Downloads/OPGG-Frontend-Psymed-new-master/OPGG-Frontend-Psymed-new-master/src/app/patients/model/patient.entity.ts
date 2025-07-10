export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: Date;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  height: number;
  weight: number;
  medicalHistory: string;
  emergencyContact: string;
  emergencyPhone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  insuranceProvider: string;
  description: string;
  allergies: string[];
  medicalConditions: string[];
  profilePhoto: string;
  isActive: boolean;

  constructor(patient: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    birthDate?: Date,
    dateOfBirth?: string,
    gender?: string,
    bloodType?: string,
    height?: number,
    weight?: number,
    medicalHistory?: string,
    emergencyContact?: string,
    emergencyPhone?: string,
    emergencyContactName?: string,
    emergencyContactPhone?: string,
    emergencyContactRelation?: string,
    insuranceProvider?: string,
    description?: string,
    allergies?: string[],
    medicalConditions?: string[],
    profilePhoto?: string,
    isActive?: boolean
  }) {
    this.id = patient.id || 0;
    this.firstName = patient.firstName || '';
    this.lastName = patient.lastName || '';
    this.email = patient.email || '';
    this.phone = patient.phone || '';
    this.birthDate = patient.birthDate || new Date();
    this.dateOfBirth = patient.dateOfBirth || '';
    this.gender = patient.gender || '';
    this.bloodType = patient.bloodType || '';
    this.height = patient.height || 0;
    this.weight = patient.weight || 0;
    this.medicalHistory = patient.medicalHistory || '';
    this.emergencyContact = patient.emergencyContact || '';
    this.emergencyPhone = patient.emergencyPhone || '';
    this.emergencyContactName = patient.emergencyContactName || '';
    this.emergencyContactPhone = patient.emergencyContactPhone || '';
    this.emergencyContactRelation = patient.emergencyContactRelation || '';
    this.insuranceProvider = patient.insuranceProvider || '';
    this.description = patient.description || '';
    this.allergies = patient.allergies || [];
    this.medicalConditions = patient.medicalConditions || [];
    this.profilePhoto = patient.profilePhoto || '';
    this.isActive = patient.isActive || true;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  get age(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
