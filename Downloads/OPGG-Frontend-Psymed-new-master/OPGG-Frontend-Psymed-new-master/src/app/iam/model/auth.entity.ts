export class Auth {
  id: number;
  email: string;
  password: string;
  token: string;
  userType: 'patient' | 'medic';
  isActive: boolean;

  constructor(auth: {
    id?: number,
    email?: string,
    password?: string,
    token?: string,
    userType?: 'patient' | 'medic',
    isActive?: boolean
  }) {
    this.id = auth.id || 0;
    this.email = auth.email || '';
    this.password = auth.password || '';
    this.token = auth.token || '';
    this.userType = auth.userType || 'patient';
    this.isActive = auth.isActive || false;
  }
}
