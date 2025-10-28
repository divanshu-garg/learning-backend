// learning about REST APIs and CRUD operations in express

// const express = require('express');
import express from "express";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";

const server = express();
// const productRouter = express.Router();

server.use('/products', productRouter)
server.use('/users', userRouter)
server.use(express.json());


server.listen(8080);