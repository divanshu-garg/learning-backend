// const fs = require('fs')
import fs from "fs";
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// let products = data.products;
import Product from "../model/product.js";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// for view
const getProductsSSR = (req, res) => {
  Product.find()
    .then((p) =>{
        console.log('Products found:', p);
        ejs.renderFile(path.resolve(__dirname, "../pages/index.ejs"), {products:p}, function(err, str){
            res.send(str);
        });
    })
    // .catch(e=> res.send(e));
};

const createProducts = (req, res) => {
  // must set express.json() built in middleware to parse incoming json in req.body
  let product = new Product(req.body);
  product
    .save()
    .then((p) => res.json(p))
    .catch((e) => res.json(e));
};

const getProducts = (req, res) => {
  Product.find()
    .then((p) => res.json(p))
    .catch((e) => res.json(e));
};

const getProductById = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((p) => res.json(p))
    .catch((e) => res.json(e));
};

const changeProduct = (req, res) => {
  const value = req.body;
  const id = req.params.id;
  Product.findOneAndReplace({ _id: id }, value, {
    new: true,
    runValidators: true,
  })
    .then((prod) => res.json(prod))
    .catch((e) => res.json(e));
};

const updateProduct = (req, res) => {
  const value = req.body;
  const id = req.params.id;
  Product.findOneAndUpdate({ _id: id }, value, {
    new: true,
    runValidators: true,
  })
    .then((prod) => res.json(prod))
    .catch((e) => res.json(e));
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete({ _id: id })
    .then((prod) => res.json(prod))
    .catch((e) => res.json(e));
};

export {
  createProducts,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsSSR,
  changeProduct,
};
