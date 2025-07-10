import { Appointment } from './appointment.entity';

describe('Appointment', () => {
  it('should create an instance', () => {
    const appointment = new Appointment({});
    expect(appointment).toBeTruthy();
  });

  it('should create with default values', () => {
    const appointment = new Appointment({});
    expect(appointment.id).toBe(0);
    expect(appointment.status).toBe('scheduled');
    expect(appointment.isScheduled).toBe(true);
    expect(appointment.isCompleted).toBe(false);
    expect(appointment.isCancelled).toBe(false);
  });

  it('should return correct status flags', () => {
    const completedAppointment = new Appointment({ status: 'completed' });
    expect(completedAppointment.isCompleted).toBe(true);
    expect(completedAppointment.isScheduled).toBe(false);

    const cancelledAppointment = new Appointment({ status: 'cancelled' });
    expect(cancelledAppointment.isCancelled).toBe(true);
    expect(cancelledAppointment.isScheduled).toBe(false);
  });
});
