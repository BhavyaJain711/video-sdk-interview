import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/video-sdk');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }
);