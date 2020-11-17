import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/lazyKitchen',
  //JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  //accessKeyId: process.env.accessKeyId || 'accessKeyId',
  //secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
  //facebookClientId: process.env.facebookClientId || 'facebookClientId',
  //facebookClientSecret: process.env.facebookClientSecret || 'facebookClientSecret',
}