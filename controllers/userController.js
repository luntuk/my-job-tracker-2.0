import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
 
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user: user.toJSON() });
};
 
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};
 
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;
 
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
    new: true,
    runValidators: true,
  });
 
  res.status(StatusCodes.OK).json({ msg: 'update user', user: updatedUser });
};
