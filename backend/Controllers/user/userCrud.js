import httpStatus from 'http-status';
import User from '../../Models/User.js'

export const createUser = async (req, res) => {
    try {
      const { username, email, password, bio } = req.body;
      
      const newUser = new User({
        username,
        email,
        password,
        bio
      });
  
      const savedUser = await newUser.save();
  
      res.status(httpStatus.CREATED).json({
        status: 'success',
        data: savedUser,
      });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
  
//Get all User
 export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(httpStatus.OK).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

//get one user
export const getUser =  async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password, bio },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

//delete user
 export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: deletedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

