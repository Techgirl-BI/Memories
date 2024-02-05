// messageController.js

import httpStatus from 'http-status';
import Message from '../../Models/Message.js';

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { content, senderId, receiverId } = req.body;

    const newMessage = new Message({
      content,
      senderId,
      receiverId,
    });

    const savedMessage = await newMessage.save();

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Error creating message:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();

    res.status(httpStatus.OK).json({
      status: 'success',
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Get a message by ID
export const getMessageById = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Message not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: message,
    });
  } catch (error) {
    console.error('Error fetching message:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Update a message by ID
export const updateMessageById = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const { content } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Message not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: updatedMessage,
    });
  } catch (error) {
    console.error('Error updating message:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Delete a message by ID
export const deleteMessageById = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Message not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: deletedMessage,
    });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
