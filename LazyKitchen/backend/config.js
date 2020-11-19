import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/lazyKitchen',
  facebookClientId: process.env.facebookClientId || 'facebookClientId',
  facebookClientSecret: process.env.facebookClientSecret || 'facebookClientSecret',
  //accessKeyId: process.env.accessKeyId || 'accessKeyId',
  //secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};