import jwt from "jsonwebtoken";
import User from "../model/user.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;

    await user.save();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
    res.status(401).json({message:"incorrect email, user does not exist"});
    return;
    }
    const isAuth = bcrypt.compareSync(req.body.password, user.password); // true    
    if (isAuth) {
      let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      user.token = token;
      await user.save();
      res.json({token})
    }else{
    res.status(401).json({message:"incorrect password"});
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
