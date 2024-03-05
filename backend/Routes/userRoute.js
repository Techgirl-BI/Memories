import express from "express";
import {createUser, getAllUsers, getUser, updateUser, deleteUser, loginUser, logoutUser} from "../Controllers/user/userCrud.js"
export const userRouter = express.Router()

userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUser)
userRouter.patch('/:userId', updateUser)
userRouter.delete('/:userId', deleteUser)
userRouter.post('/logout', logoutUser )




