import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Database 📂');
  } catch (err) {
    console.log('Error connected to databse:-', err.message);
  }
};
export default connectDB;
