import httpStatus from "http-status";
import Comment from "../../Models/Comment.js"

export const createComment = async (req, res) => {
    try {
      const { content, postId, userId } = req.body;
      const newComment = new Comment({ content, postId, userId });
      await newComment.save();
      res.status(httpStatus.CREATED).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  export const getComments = async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(httpStatus.OK).json(comments);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }
  export const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
  
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(httpStatusttpStatus.NOT_FOUND).json({ message: 'Comment not found' });
      }
  
      res.status(httpStatus.OK).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  export const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedComment = await Comment.findByIdAndDelete(id);
  
      if (!deletedComment) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Comment not found' });
      }
  
      res.status(httpStatus.OK).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }