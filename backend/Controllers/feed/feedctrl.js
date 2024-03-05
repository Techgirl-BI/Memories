import Post from "../../Models/Post.js";
import httpStatus from 'http-status';

export const feed = async (req, res) => {
    try {
      // Fetch posts from the database based on user's preferences, followed users, etc.
      const user = req.user; // Get user from authentication middleware
      console.log(user);
      const userPreferences = user.preferences; // Assuming user preferences are stored in user document
      const followedUsers = user.following; // Assuming followed users are stored in user document
  
      // Example query to fetch personalized feed based on user preferences and followed users
      const feed = await Post.find({
        $or: [
          { author: { $in: followedUsers } }, // Posts from followed users
          { category: { $in: userPreferences } } // Posts matching user preferences
        ]
      }).populate('author', 'username'); // Populate author field with username
  
      res.json(feed);
    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).json({ message: 'Error fetching feed' });
    }
  }