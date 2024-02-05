// Importing necessary libraries
import mongoose from 'mongoose'
// Define the Message Schema
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Export the Message model
export default Message;