import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';
import { hashPassword } from './utils/passwordUtils.js';

try {
  await mongoose.connect(process.env.MONGO_URL);
  
  // Create or get seeded user
  const seedEmail = process.env.SEED_USER_EMAIL || 'user@example.com';
  const seedPassword = process.env.SEED_USER_PASSWORD || 'password123';
  let user = await User.findOne({ email: seedEmail });
  if (!user) {
    const hashedPassword = await hashPassword(seedPassword);
    user = await User.create({
      name: 'Seed User',
      email: seedEmail,
      password: hashedPassword,
      lastName: 'User',
      location: 'Sample City',
      role: 'user'
    });
    console.log('Seed user created!');
  }
  
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!! Seed jobs populated.');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
