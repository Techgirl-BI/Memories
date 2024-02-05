import express from "express";
import { createPost, getPosts, getPostById, updatePostById, deletePostById } from "../Controllers/post/postCrud.js";

export const postRouter = express.Router()
postRouter.post("/", createPost)
postRouter.get("/", getPosts)
postRouter.get("/:id", getPostById)
postRouter.patch("/:id", updatePostById)
postRouter.delete("/:id", deletePostById)
