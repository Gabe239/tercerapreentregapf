import mongoose from 'mongoose';
import config from '../config/env-config.js';
const mongoUrl = config.mongoUrl;
export function connectToDatabase() {
  mongoose.connect(mongoUrl, (error) => {
    if (error) {
      console.log('Cannot connect to database: ' + error);
      process.exit();
    }
  });


}