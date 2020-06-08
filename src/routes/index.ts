import { Router } from 'express';
import appointmentsRouter from './appoinstments.routes';
import usersRouter from './user.routs';
import sessionsRouter from './sessions.routs';

const routes = Router();


routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
