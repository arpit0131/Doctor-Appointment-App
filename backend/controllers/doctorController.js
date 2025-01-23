import doctorModel from '../models/doctorsModel.js';

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
export { changeAvailability, getDoctorList };
