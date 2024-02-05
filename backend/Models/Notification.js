// Importing necessary libraries
import mongoose from 'mongoose';
// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  triggeringUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

// Export the Notification model
export default Notification;