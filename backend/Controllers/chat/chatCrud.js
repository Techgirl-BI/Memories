import httpStatus from 'http-status';
import Chat from '../../Models/Chats.js';

// Create a new chat
export const createChat = async (req, res) => {
  try {
    const { participants } = req.body;

    const newChat = new Chat({
      participants,
      messages: [],
    });

    const savedChat = await newChat.save();

    res.status(httpStatus.CREATED).json({
      status: 'success',
      data: savedChat,
    });
  } catch (error) {
    console.error('Error creating chat:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Get all chats
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();

    res.status(httpStatus.OK).json({
      status: 'success',
      data: chats,
    });
  } catch (error) {
    console.error('Error fetching chats:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Get a chat by ID
export const getChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Chat not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: chat,
    });
  } catch (error) {
    console.error('Error fetching chat:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Update a chat by ID
export const updateChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { participants } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { participants },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Chat not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: updatedChat,
    });
  } catch (error) {
    console.error('Error updating chat:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

// Delete a chat by ID
export const deleteChatById = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'error',
        message: 'Chat not found',
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      data: deletedChat,
    });
  } catch (error) {
    console.error('Error deleting chat:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
