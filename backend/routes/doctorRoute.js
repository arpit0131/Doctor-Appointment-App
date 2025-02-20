import express from 'express';
import { doctorLogin, getDoctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();
doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', doctorLogin);
export default doctorRouter;
