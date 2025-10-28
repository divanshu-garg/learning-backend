
// const fs = require('fs')
import fs from "fs"
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
let products = data.products;

const createProducts = (req,res)=> {
    // must set express.json() built in middleware to parse incoming json in req.body
    const product = req.body;
    console.log(product);
    
    products = [...products, product];
    res.json(products);
    // res.json({type:"post"})
}

const getProducts = (req,res)=>{
    res.json(products);
}

const getProductById = (req,res)=>{
    const id = Number(req.params.id);
    const product = products.find(p=>p.id === id);
    res.json(product);
}

const changeProduct = (req,res)=>{
    const value = req.body;
    const id = Number(req.params.id);
    products =  products.map(p=> p.id === id ? value : p);
    res.send({"message": "successful"})
}

const updateProduct = (req,res)=>{
    const value = req.body;
    const id = Number(req.params.id);
    products =  products.map(p=> p.id === id ? {...p, ...value} : p);
    res.send({"message": "successful"})
}

const deleteProduct = (req,res)=>{
    const id = Number(req.params.id);
    products = products.filter(p=> p.id !==id)
    res.json(products);
}

export {createProducts, getProductById, getProducts, updateProduct, deleteProduct, changeProduct}