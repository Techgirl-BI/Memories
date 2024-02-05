// Importing necessary libraries
import mongoose from 'mongoose'
// import profilePic from "../../backend/assets/profile_pic"
// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    // default: profilePic, 
  },
  bio: {
    type: String,
    default: '',
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;