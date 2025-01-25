import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//api to register user
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: 'Please provide all details',
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please provide valid email',
      });
    }
    if (password.length < 3) {
      return res.json({ success: false, message: 'Password is too small' });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User is already exist' });
    }
    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: 'Please provide the all details',
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please provide valid email',
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'User is not Registered. Please register',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Please enter valid credentials',
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { registerUser, loginUser };
