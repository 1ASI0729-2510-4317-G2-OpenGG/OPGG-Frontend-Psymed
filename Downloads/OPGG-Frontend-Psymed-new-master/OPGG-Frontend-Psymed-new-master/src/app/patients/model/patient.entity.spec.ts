import { Patient } from './patient.entity';

describe('Patient', () => {
  it('should create an instance', () => {
    const patient = new Patient({});
    expect(patient).toBeTruthy();
  });

  it('should create with default values', () => {
    const patient = new Patient({});
    expect(patient.id).toBe(0);
    expect(patient.firstName).toBe('');
    expect(patient.isActive).toBe(true);
  });

  it('should return full name', () => {
    const patient = new Patient({
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(patient.fullName).toBe('John Doe');
  });

  it('should calculate age correctly', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);

    const patient = new Patient({
      birthDate: birthDate
    });

    expect(patient.age).toBe(25);
  });
});
