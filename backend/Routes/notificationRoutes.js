import express from 'express'
import { getNotifications, deleteNotification } from '../Controllers/notification/notificationCrud.js'

const notificationRouter = express.Router()
notificationRouter.get('/', getNotifications) 
notificationRouter.delete('/', deleteNotification) 


export {notificationRouter}
