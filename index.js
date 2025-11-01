// learning about REST APIs and CRUD operations in express

// const express = require('express');
import { configDotenv } from "dotenv";
import express from "express";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authRouter from "./routes/auth.js";

configDotenv();
// console.log(process.env.DB_PASSWORD);

// mongoDB connection
async function main() {
  await mongoose.connect(
    `mongodb+srv://divanshu:${process.env.DB_PASSWORD}@cluster0.qoreslq.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`
  );
  console.log("database connected");
}

const server = express();
// const productRouter = express.Router();
const auth = ((req, res, next) => {
  
  try {
    const header = req.get("Authorization").split(" ")[1];
    var decoded = jwt.verify(header, process.env.JWT_SECRET);
    console.log(decoded);
    if (decoded.email) {
      next();
    }
  } catch (error) {
    res.sendStatus(401);
  }
});
server.use(express.json());
server.use("/products", auth, productRouter);
server.use("/users", auth, userRouter);
server.use('/auth', authRouter)
// console.log("reached here");

// (async () => {
  await main().catch((err) => console.log(err));
  server.listen(8080);
// })();
