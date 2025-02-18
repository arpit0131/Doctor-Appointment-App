import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorsModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: 'Some details are missing' });
    }

    //validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter valid email' });
    }

    if (password.length < 4) {
      return res.json({
        success: false,
        message: 'Please enter storng password',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.json({
      success: true,
      message: "Doctor's detail saved successfully",
    });
  } catch (e) {
    console.log('Error is adding doctor:- ', e);

    return res.json({ success: false, message: e.message });
  }
};

//Api for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (e) {
    console.log('Error in Admin login:- ', e);

    res.json({ success: false, message: e.message });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (e) {
    console.log(e);

    res.json({ success: false, message: e.message });
  }
};

//get all appointment
const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: 'Appointment not found' });
    }
    // await appointmentModel.findByIdAndUpdate(appointmentId, {
    //   cancelled: true,
    // });
    await appointmentModel.findByIdAndDelete(appointmentId);

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData?.slots_booked?.[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    res.json({ success: true, message: 'Appointment Canceled' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentAdmin,
  cancelAppointment,
};
