import { Profile } from './profile.entity';

describe('Profile', () => {
  it('should create an instance', () => {
    const profile = new Profile({});
    expect(profile).toBeTruthy();
  });

  it('should create with default values', () => {
    const profile = new Profile({});
    expect(profile.id).toBe(0);
    expect(profile.firstName).toBe('');
    expect(profile.userType).toBe('patient');
    expect(profile.isActive).toBe(true);
  });

  it('should return full name', () => {
    const profile = new Profile({
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(profile.fullName).toBe('John Doe');
  });
});
