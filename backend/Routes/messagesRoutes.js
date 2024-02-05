import express from 'express'
import {createMessage, getMessages, getMessageById, updateMessageById, deleteMessageById} from "../Controllers/messages/messagesCrud.js"
export const messageRouter = express.Router()

messageRouter.post('/', createMessage )
messageRouter.get('/', getMessages )
messageRouter.get('/:id', getMessageById)
messageRouter.patch('/', updateMessageById )
messageRouter.get('/:id', deleteMessageById)