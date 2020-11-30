import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3001,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/lazyKitchen',
  JWT_SECRET: process.env.JWT_SECRET || '1111-9999',
  facebookClientId: process.env.facebookClientId || 'facebookClientId',
  facebookClientSecret: process.env.facebookClientSecret || 'facebookClientSecret',
  
};