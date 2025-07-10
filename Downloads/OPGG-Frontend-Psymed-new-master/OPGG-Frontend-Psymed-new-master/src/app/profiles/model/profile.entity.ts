export class Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: 'patient' | 'medic';
  profileImageUrl: string;
  isActive: boolean;

  constructor(profile: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    userType?: 'patient' | 'medic',
    profileImageUrl?: string,
    isActive?: boolean
  }) {
    this.id = profile.id || 0;
    this.firstName = profile.firstName || '';
    this.lastName = profile.lastName || '';
    this.email = profile.email || '';
    this.phone = profile.phone || '';
    this.userType = profile.userType || 'patient';
    this.profileImageUrl = profile.profileImageUrl || '';
    this.isActive = profile.isActive || true;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
