import express from 'express';
import {
  appointmentCancel,
  appointmentCompleted,
  appointmentDoctor,
  doctorDashboard,
  doctorLogin,
  getDoctorList,
} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();
doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/appointments', authDoctor, appointmentDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentCompleted);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);

export default doctorRouter;
