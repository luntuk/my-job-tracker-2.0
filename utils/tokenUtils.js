import jwt from 'jsonwebtoken';

const defaultExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: defaultExpiresIn,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
