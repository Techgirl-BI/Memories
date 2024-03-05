import httpStatus from "http-status";
import Post from "../../Models/Post.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, image, videos, user } = req.body; 
    const newPost = new Post({
      title,
      content,
      image,
      videos,
      user,
      createdAt: new Date(),
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const posts = await Post.paginate(
      {},
      {
        limit: 6,
        sort: { createdAt: -1 }, // Sorting by createdAt field in descending order
        page: Number(page),
      }
    );

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//get one post
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Update a post by ID
export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, images, videos } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content, images, videos },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Delete a post by ID
export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Post not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
