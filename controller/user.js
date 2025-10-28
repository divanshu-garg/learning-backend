
// const fs = require('fs')
import fs from "fs"
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
let users = data.users;

const createUsers = (req,res)=> {
    // must set express.json() built in middleware to parse incoming json in req.body
    const user = req.body;
    console.log(user);
    
    users = [...users, user];
    res.json(users);
    // res.json({type:"post"})
}

const getUsers = (req,res)=>{
    res.json(users);
}

const getUserById = (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(p=>p.id === id);
    res.json(user);
}

const changeUser = (req,res)=>{
    const value = req.body;
    const id = Number(req.params.id);
    users =  users.map(p=> p.id === id ? value : p);
    res.send({"message": "successful"})
}

const updateUser = (req,res)=>{
    const value = req.body;
    const id = Number(req.params.id);
    users =  users.map(p=> p.id === id ? {...p, ...value} : p);
    res.send({"message": "successful"})
}

const deleteUser = (req,res)=>{
    const id = Number(req.params.id);
    users = users.filter(p=> p.id !==id)
    res.json(users);
}

export {createUsers, getUserById, getUsers, updateUser, deleteUser, changeUser}