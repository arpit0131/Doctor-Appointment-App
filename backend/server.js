import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectToCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);

app.get('/', (req, res) => {
  res.send('Api working...Cool!');
});

app.listen(port, () => {
  connectDB();
  connectToCloudinary();
  console.log(`Server running on port ${port} 🚀 cool!`);
});
