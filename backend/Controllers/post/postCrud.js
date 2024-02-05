import httpStatus from 'http-status';
import Post from '../../Models/Post.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;

    const newPost = new Post({
      content,
      user: userId
    });

    const savedPost = await newPost.save();

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: savedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
      const posts = await Post.find();
  
      res.status(httpStatus.OK).json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };

  //get one post
  export const getPostById = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'error',
          message: 'Post not found',
        });
      }
  
      res.status(httpStatus.OK).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      console.error('Error fetching post:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  
  // Update a post by ID
  export const updatePostById = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { title, content } = req.body;
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'error',
          message: 'Post not found',
        });
      }
  
      res.status(httpStatus.OK).json({
        status: 'success',
        data: updatedPost,
      });
    } catch (error) {
      console.error('Error updating post:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  
  // Delete a post by ID
  export const deletePostById = async (req, res) => {
    try {
      const postId = req.params.postId;
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: 'error',
          message: 'Post not found',
        });
      }
  
      res.status(httpStatus.OK).json({
        status: 'success',
        data: deletedPost,
      });
    } catch (error) {
      console.error('Error deleting post:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };