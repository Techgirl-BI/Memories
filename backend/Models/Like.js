// Importing necessary libraries
import mongoose from "mongoose"
// Define the Like Schema
const likeSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Polymorphic association: reference either Post or Comment
  likedItem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'likedItemType',
  },
  likedItemType: {
    type: String,
    enum: ['Post', 'Comment'],
    required: true,
  },
});

// Create the Like model
const Like = mongoose.model('Like', likeSchema);

// Export the Like model
export default Like;