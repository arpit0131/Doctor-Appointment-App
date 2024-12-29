import { v2 as cloudinary } from 'cloudinary';

const connectToCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    // Test connection by calling Cloudinary API
    const result = await cloudinary.api.ping();
    console.log('Connected to Cloudinary:', result);
  } catch (error) {
    console.error('Failed to connect to Cloudinary:', error.message);
  }
};

export default connectToCloudinary;
