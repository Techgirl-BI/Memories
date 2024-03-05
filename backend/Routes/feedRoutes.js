import express from 'express'
import { feed } from '../Controllers/feed/feedctrl.js'
import authMiddleware from '../Middleware/Auth.js'
const feedRouter = express.Router()

// feedRouter.get("/user_feed",  feed)

export default feedRouter