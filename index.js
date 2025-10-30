// learning about REST APIs and CRUD operations in express

// const express = require('express');
import { configDotenv } from "dotenv";
import express from "express";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import mongoose from "mongoose";

configDotenv()
console.log(process.env.DB_PASSWORD);

// mongoDB connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("database connected");
}



const server = express();
// const productRouter = express.Router();

server.use(express.json());
server.use('/products', productRouter)
server.use('/users', userRouter)


server.listen(8080);