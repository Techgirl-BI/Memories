import express from 'express'
import httpStatus from "http-status";
import morgan from "morgan"
import colors from "colors"
import cors from 'cors'
import {userRouter} from "../backend/Routes/userRoute.js"
import dotenv from "dotenv";
dotenv.config({});
import {dbConnect} from "../backend/Config/dbConnect.js"
import { postRouter } from './Routes/postRoutes.js';
import { messageRouter } from './Routes/messagesRoutes.js';
import {notificationRouter} from './Routes/notificationRoutes.js';
import { commentRouter } from './Routes/commentRoutes.js';

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("public"))
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/messages", messageRouter)
app.use("/notification", notificationRouter )
app.use("/comment", commentRouter )
app.use("/likes", commentRouter )



app.get("/", (req, res) => {
    try {
      res
        .status(httpStatus.OK)
        .json({
          status: "Success",
          message: "Welcome to my Social Media Application",
        });
    } catch (error) {
      console.log(error.message);
      res.status(httpStatus[404]).send(error.message);
    }
  });
  app.all("*", (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      payload: "endpoint not defined",
    });
  });

  dbConnect()
  .then((result) => {
    console.log("connected to Database".bgGreen);

    const port = process.env.NODE_ENV === "development" ? process.env.PORT : 7000;

    app.listen(port, () =>{
      console.log(
        `app is running on port ${port} in ${process.env.NODE_ENV} mode`.bgGreen
      );
    });
  })
  .catch((err) => console.log(`dbError:${err}`.bgRed));
