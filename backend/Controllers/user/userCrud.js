import httpStatus from 'http-status';
import User from '../../Models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
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
  
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token
    res.status(httpStatus.OK).json({user});
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export const logoutUser = async (req, res) => {
  // Invalidate JWT token or destroy session (depending on implementation)
  // You may also want to clear any stored tokens or session IDs on the client-side
  res.json({ message: 'Logout successful' });
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

