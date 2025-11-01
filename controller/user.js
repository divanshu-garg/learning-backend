import mongoose from "mongoose";
import User from "../model/user.js";

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  console.log({id})
  const user = await User.findById(id);
  res.json(user);
};
const changeUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndReplace({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndUpdate({_id:id},req.body,{new:true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await User.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(400).json(err);
  }
};

export {getAllUsers, getUser, updateUser, deleteUser, changeUser}