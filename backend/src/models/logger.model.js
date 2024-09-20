import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  action: {
    type: String,
    enum: ['User Logged in successfully', 'User Logged out successfully'], // Restrict to 'login' or 'logout'
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
});

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);
