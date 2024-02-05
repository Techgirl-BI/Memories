import httpStatus from "http-status";
import Like from "../../Models/Like.js";

export const createLike = async (req, res) => {
    try {
      const { userId, postId } = req.body;
      const existingLike = await Like.findOne({ userId, postId });
  
      if (existingLike) {
        return res.status(httpStatus.CONFLICT).json({ message: 'Like already exists' });
      }
  
      const newLike = new Like({ userId, postId });
      await newLike.save();
      res.status(httpStatus.CREATED).json(newLike);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  export const getLikes = async (req, res) => {
    try {
      const likes = await Like.find();
      res.status(httpStatus.OK).json(likes);
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  const deleteLike =  async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedLike = await Like.findByIdAndDelete(id);
  
      if (!deletedLike) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Like not found' });
      }
  
      res.status(httpStatus.OK).json({ message: 'Like deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }