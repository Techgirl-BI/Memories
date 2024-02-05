import express from 'express'
import { createLike, getLikes, deleteLike } from '../Controllers/like/likeCrud'

const likeRouter = express.Router()

likeRouter.post('/', createLike)
likeRouter.get('/', getLikes)
likeRouter.get('/', deleteLike)
