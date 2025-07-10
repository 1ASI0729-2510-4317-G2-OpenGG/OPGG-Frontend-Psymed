import { Medic } from './medic.entity';

describe('Medic', () => {
  it('should create an instance', () => {
    const medic = new Medic({});
    expect(medic).toBeTruthy();
  });

  it('should create with default values', () => {
    const medic = new Medic({});
    expect(medic.id).toBe(0);
    expect(medic.firstName).toBe('');
    expect(medic.yearsOfExperience).toBe(0);
    expect(medic.isActive).toBe(true);
  });

  it('should return full name with Dr. prefix', () => {
    const medic = new Medic({
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(medic.fullName).toBe('Dr. John Doe');
  });

  it('should return correct experience level', () => {
    const juniorMedic = new Medic({ yearsOfExperience: 1 });
    expect(juniorMedic.experienceLevel).toBe('Junior');

    const midMedic = new Medic({ yearsOfExperience: 3 });
    expect(midMedic.experienceLevel).toBe('Mid-level');

    const seniorMedic = new Medic({ yearsOfExperience: 7 });
    expect(seniorMedic.experienceLevel).toBe('Senior');

    const expertMedic = new Medic({ yearsOfExperience: 15 });
    expect(expertMedic.experienceLevel).toBe('Expert');
  });
});
