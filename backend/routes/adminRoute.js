import express from 'express';
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentAdmin,
  cancelAppointment,
  loginAdmin,
} from '../controllers/AdminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentAdmin);
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter;
