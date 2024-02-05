import express from 'express'
import { createComment, getComments, updateComment, deleteComment} from '../Controllers/comment/commentCrud.js'

const commentRouter = express.Router()

commentRouter.post('/', createComment)
commentRouter.get('/', getComments)
commentRouter.patch('/:id', updateComment)
commentRouter.delete('/:id', deleteComment) 

export {commentRouter}