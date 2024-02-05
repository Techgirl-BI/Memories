import express from "express";
import {createUser, getAllUsers, getUser, updateUser, deleteUser} from "../Controllers/user/userCrud.js"
export const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.patch('/:userId', updateUser)
userRouter.delete('/:userId', deleteUser)




