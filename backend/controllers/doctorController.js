import doctorModel from '../models/doctorsModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: 'Availability changed' });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

const getDoctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

//API for Doctor Login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get doctors Appointments
const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Mark Appointment compeleted for docotr panel
const appointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Mark Failed' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Cancel Appointment for docotr panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    console.log('Data id from appointment data:- ', appointmentData.docId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    } else {
      return res.json({ success: false, message: 'Mark Failed' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  getDoctorList,
  doctorLogin,
  appointmentDoctor,
  appointmentCancel,
  appointmentCompleted,
};
