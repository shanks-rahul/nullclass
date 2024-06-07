import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import errorMiddleware from "./middleware/error.middleware.js";
config();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

import videoRoutes from "./routes/video.routes.js"
import userRoutes from "./routes/user.routes.js"
import commentRoutes from "./routes/comments.routes.js"
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/video",videoRoutes);
app.use("/api/v1/comment",commentRoutes);
app.use(errorMiddleware);

export default app;