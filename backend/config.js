const dotenv = require('dotenv');

dotenv.config();

module.expots= {
  PORT: process.env.PORT || 3001,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/lazyKitchen',
  secretOrKey: process.env.secretOrKey || 'somethingsecrethere',
  facebookClientId: process.env.facebookClientId || 'facebookClientId',
  facebookClientSecret: process.env.facebookClientSecret || 'facebookClientSecret',
  
};