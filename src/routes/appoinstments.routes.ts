import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreatAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated)

/**
 * Get all appointments in database
 *
 * @returns Appointment[]
 */
appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)

  return response.json(await appointmentRepository.find());
})


/**
 * Create new appointment in database
 *
 * @param provider  the provider of appointment
 * @param date      the date of appointment
 *
 * @returns Appointment
 */
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date)

  const creatAppointmentService = new CreatAppointmentService();

  const appointment = await creatAppointmentService.run({
    provider_id,
    date: parsedDate
  });

  return response.json({ appointment })

})

export default appointmentsRouter;
