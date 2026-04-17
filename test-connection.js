import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function testConnection() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

testConnection();