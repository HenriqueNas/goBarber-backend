import AppointmentRepository from '../repositories/AppointmentRepository';
import Appointment from "../models/Appointment";
import { getCustomRepository } from "typeorm";
import { startOfHour } from 'date-fns'
import AppError from '../errors/AppError';

interface Request {
  provider_id: string,
  date: Date
}

class CreatAppointmentService {
  public async run({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    date = startOfHour(date);

    if (await appointmentRepository.findByDate(date)) {
      throw new AppError('Unavaliable Appointment Time')
    }
    const appointment = appointmentRepository.create({
      provider_id,
      date
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }

}

export default CreatAppointmentService;
