import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  }],
  messages: [{
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
