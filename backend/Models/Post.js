import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
// Define the Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
 image: [{
  type: String,
  }],
  videos: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
});
postSchema.plugin(mongoosePaginate);
// Create the Post model
const Post = mongoose.model('Post', postSchema);
Post.paginate().then({})
// Export the Post model
export default Post;
