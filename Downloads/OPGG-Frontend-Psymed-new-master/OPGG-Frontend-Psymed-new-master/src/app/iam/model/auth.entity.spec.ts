import { Auth } from './auth.entity';

describe('Auth', () => {
  it('should create an instance', () => {
    const auth = new Auth({});
    expect(auth).toBeTruthy();
  });

  it('should create with default values', () => {
    const auth = new Auth({});
    expect(auth.id).toBe(0);
    expect(auth.email).toBe('');
    expect(auth.userType).toBe('patient');
    expect(auth.isActive).toBe(false);
  });

  it('should create with provided values', () => {
    const auth = new Auth({
      id: 1,
      email: 'test@example.com',
      userType: 'medic',
      isActive: true
    });
    expect(auth.id).toBe(1);
    expect(auth.email).toBe('test@example.com');
    expect(auth.userType).toBe('medic');
    expect(auth.isActive).toBe(true);
  });
});
