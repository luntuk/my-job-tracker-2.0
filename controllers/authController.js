import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';
import { isDatabaseConnected } from '../utils/databaseUtils.js';

export const register = async (req, res) => {
  if (!isDatabaseConnected()) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      msg: 'Database not available. Please try again later.',
    });
  }

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  const token = createJWT({ userId: user._id, role: user.role });
  res.status(StatusCodes.CREATED).json({ msg: 'user created', token, user });
};

export const login = async (req, res) => {
  if (!isDatabaseConnected()) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      msg: 'Database not available. Please try again later.',
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('Invalid credentials');

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new UnauthenticatedError('Invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });
  res.status(StatusCodes.OK).json({ msg: 'user logged in', token, user });
};

export const getCurrentUser = async (req, res) => {
  if (!isDatabaseConnected()) {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      msg: 'Database not available. Please try again later.',
    });
  }

  const user = await User.findById(req.user.userId).select('-password');
  if (!user) throw new NotFoundError('User not found');

  res.status(StatusCodes.OK).json({ user });
};

export const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
