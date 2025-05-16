export interface User {
  id: number;
  username: string;
  password: string;
  role: 'doctor' | 'patient';
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
