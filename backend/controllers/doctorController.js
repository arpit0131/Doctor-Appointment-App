import doctorModel from '../models/doctorsModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      res.json({ success: false, message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { changeAvailability, getDoctorList, doctorLogin };
